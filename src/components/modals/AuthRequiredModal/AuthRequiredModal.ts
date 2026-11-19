import type { MouseEventHandler, ChangeEventHandler } from 'react';
export interface AuthRequiredModalProps {
  gate: { text?: string; close?: MouseEventHandler<HTMLButtonElement> };
}
