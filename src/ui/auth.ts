import { t, type TranslationKey } from '@/i18n';
import { getCredentialsError } from '@/logic/credentials';
import { register, signIn, signInWithGoogle } from '@/service/auth';
import { openDialog } from './dialog';
import eyeIcon from '@/assets/icons/eye.svg?raw';
import eyeOffIcon from '@/assets/icons/eye-off.svg?raw';
import './auth.scss';

type AuthMode = 'sign-in' | 'register';

function renderToggle(): string {
  return `
    <button
      class="auth__toggle"
      type="button"
      data-action="password"
      aria-label="${t('auth.showPassword')}"
    >
      ${eyeIcon}
    </button>
  `;
}

function renderField(
  name: string,
  type: string,
  label: string,
  autocomplete: string,
): string {
  return `
    <label class="auth__field">
      <span>${label}</span>
      <span class="auth__control">
        <input
          class="auth__input"
          name="${name}"
          type="${type}"
          autocomplete="${autocomplete}"
        />
        ${type === 'password' ? renderToggle() : ''}
      </span>
    </label>
  `;
}

function togglePassword(button: HTMLButtonElement): void {
  const input = button.previousElementSibling;

  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  const isVisible = input.type === 'text';

  input.type = isVisible ? 'password' : 'text';
  button.innerHTML = isVisible ? eyeIcon : eyeOffIcon;
  button.setAttribute(
    'aria-label',
    t(isVisible ? 'auth.showPassword' : 'auth.hidePassword'),
  );
}

function renderAuth(mode: AuthMode): string {
  const isRegister = mode === 'register';

  return `
    <button class="button" type="button" data-action="google">
      ${t('auth.google')}
    </button>
    <p class="auth__divider">${t('auth.or')}</p>
    <form class="auth__form">
      ${isRegister ? renderField('name', 'text', t('auth.name'), 'nickname') : ''}
      ${renderField('email', 'email', t('auth.email'), 'email')}
      ${renderField(
        'password',
        'password',
        t('auth.password'),
        isRegister ? 'new-password' : 'current-password',
      )}
      ${isRegister ? renderField('confirm', 'password', t('auth.confirm'), 'new-password') : ''}
      <p class="auth__error" hidden></p>
      <button class="button button--primary" type="submit">
        ${t(isRegister ? 'auth.submitRegister' : 'auth.submitSignIn')}
      </button>
    </form>
    <button class="button" type="button" data-action="mode">
      ${t(isRegister ? 'auth.haveAccount' : 'auth.noAccount')}
    </button>
  `;
}

export function openAuthDialog(onDone: () => void): void {
  const dialog = openDialog(t('auth.title'), renderAuth('sign-in'));
  const content = dialog.querySelector('.dialog__content');
  let mode: AuthMode = 'sign-in';

  function showError(key: TranslationKey): void {
    const element = dialog.querySelector('.auth__error');

    if (!element) {
      return;
    }

    element.textContent = t(key);
    element.removeAttribute('hidden');
  }

  function finish(errorKey: TranslationKey | undefined): void {
    if (!dialog.isConnected) {
      return;
    }

    if (errorKey) {
      showError(errorKey);

      return;
    }

    dialog.close();
    onDone();
  }

  async function submit(form: HTMLFormElement): Promise<void> {
    const data = new FormData(form);
    const email = String(data.get('email') ?? '');
    const password = String(data.get('password') ?? '');
    const name = String(data.get('name') ?? '');
    const confirm = String(data.get('confirm') ?? '');

    const invalid = getCredentialsError(
      mode === 'register'
        ? { email, password, confirm, name }
        : { email, password },
    );

    if (invalid) {
      showError(invalid);

      return;
    }

    finish(
      mode === 'register'
        ? await register(email, password, name)
        : await signIn(email, password),
    );
  }

  async function google(): Promise<void> {
    finish(await signInWithGoogle());
  }

  dialog.addEventListener('submit', (event) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      void submit(event.target);
    }
  });

  dialog.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const button = event.target.closest<HTMLButtonElement>('[data-action]');
    const action = button?.dataset.action;

    if (action === 'password' && button) {
      togglePassword(button);
    }

    if (action === 'mode' && content) {
      mode = mode === 'register' ? 'sign-in' : 'register';
      content.innerHTML = renderAuth(mode);
    }

    if (action === 'google') {
      void google();
    }
  });
}
