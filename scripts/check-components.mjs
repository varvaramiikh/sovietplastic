import { build } from 'esbuild';
import { writeFileSync, unlinkSync, readdirSync } from 'node:fs';
const outfile = new URL('./.components-check.mjs', import.meta.url);
const source = `
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import LikeButton from './src/components/ui/LikeButton/LikeButton.tsx';
import CheckButton from './src/components/ui/CheckButton/CheckButton.tsx';
import Button from './src/components/ui/Button/Button.tsx';
import FigureCard from './src/components/cards/FigureCard/FigureCard.tsx';
import PurchasePlanFields from './src/components/cards/PurchasePlanFields/PurchasePlanFields.tsx';
import Modal from './src/components/modals/Modal/Modal.tsx';
function native(element) { while(typeof element.type === 'function') element = element.type(element.props); return element; }
let wants = 0, haves = 0;
const want = () => wants++, have = () => haves++;
for(const [C, callback] of [[LikeButton, want], [CheckButton, have]]) {
 const button = native(React.createElement(C, { pressed: true, className: 'sp-on', onClick: callback }));
 assert.equal(button.type, 'button'); assert.equal(button.props['aria-pressed'], true);
 button.props.onClick({}); assert.equal(button.props.type, 'button');
}
assert.equal(wants, 1); assert.equal(haves, 1);
assert.equal(native(React.createElement(Button, { type: 'submit', disabled: true })).props.type, 'submit');
assert.equal(native(React.createElement(Button, { disabled: true })).props.disabled, true);
const item = { title: 'Балерина', img: '/images/placeholder-ballerina.svg', scale: 72, category: 'Статуэтки', mainTag: 'СССР', wantPressed: 'true', havePressed: 'false', toggleWant: want, toggleHave: have, planOn: true, setNote: () => {}, setPrice: () => {}, note: 'Магазин', price: '2500', cur: '₽' };
const markup = renderToStaticMarkup(React.createElement(FigureCard, { item }));
assert.equal((markup.match(/<article/g) || []).length, 1);
assert.equal((markup.match(/<button/g) || []).length, 2);
for(const text of ['Балерина', 'Статуэтки', 'СССР', 'Магазин', '2500', '72%', 'aria-pressed="true"', 'aria-pressed="false"']) assert.ok(markup.includes(text), text);
const plain = renderToStaticMarkup(React.createElement(FigureCard, { item: { ...item, planOn: false }, href: '#top' }));
assert.ok(!plain.includes('<input')); assert.ok(plain.includes('href="#top"'));
const noteChange = () => {}, priceChange = () => {};
const fields = PurchasePlanFields({ item: { setNote: noteChange, setPrice: priceChange } });
function controls(element, result = []) {
 if(!element || typeof element !== 'object') return result;
 if(typeof element.type === 'function') return controls(element.type(element.props), result);
 if(element.type === 'input') result.push(element);
 React.Children.forEach(element.props?.children, child => controls(child, result)); return result;
}
const inputs = controls(fields); assert.equal(inputs[0].props.onChange, noteChange); assert.equal(inputs[1].props.onChange, priceChange);
const modal = renderToStaticMarkup(React.createElement(Modal, { titleId: 'test-title', children: React.createElement('h2', { id: 'test-title' }, 'Заголовок') }));
assert.ok(modal.includes('role="dialog"')); assert.ok(modal.includes('aria-labelledby="test-title"')); assert.equal((modal.match(/<button/g)||[]).length, 2);
console.log('OK: action callbacks, pressed states, card composition, plan fields, modal and native button behavior.');
`;
try {
 const result = await build({ stdin: { contents: source, resolveDir: process.cwd(), loader: 'js' }, bundle: true, jsx: 'automatic', resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], platform: 'node', format: 'esm', packages: 'external', loader: { '.css': 'empty' }, write: false });
 writeFileSync(outfile, result.outputFiles[0].contents);
 await import(outfile.href);
 for(const group of ['ui','cards','modals']) for(const name of readdirSync(new URL('../src/components/' + group + '/', import.meta.url))) {
  const files = readdirSync(new URL('../src/components/' + group + '/' + name + '/', import.meta.url));
  if(files.sort().join('|') !== [name + '.css', name + '.ts', name + '.tsx'].sort().join('|')) throw new Error('Invalid component folder: ' + name);
 }
 console.log('OK: every new component folder contains exactly .tsx, .ts and .css.');
} finally { try { unlinkSync(outfile); } catch {} }
