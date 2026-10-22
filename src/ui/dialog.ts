import './dialog.scss';

export function openDialog(
  title: string,
  content: string,
  closeLabel = 'Close',
): HTMLDialogElement {
  const dialog = document.createElement('dialog');

  dialog.className = 'dialog';
  dialog.innerHTML = `
    <h2 class="dialog__title">${title}</h2>
    <div class="dialog__content">${content}</div>
    <button class="button button--primary dialog__close" type="button">
      ${closeLabel}
    </button>
  `;

  dialog.addEventListener('close', () => dialog.remove());
  dialog
    .querySelector('.dialog__close')
    ?.addEventListener('click', () => dialog.close());

  document.body.append(dialog);
  dialog.showModal();

  return dialog;
}
