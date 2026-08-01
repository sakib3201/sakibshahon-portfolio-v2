<script>
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let emailError = $state('');
  let messageError = $state('');
  let pending = $state(false);
  let statusKind = $state('');
  let statusText = $state('');

  function handleEmailInput() {
    emailError = '';
  }

  function handleMessageInput() {
    messageError = '';
  }

  /** @param {SubmitEvent} event */
  async function handleSubmit(event) {
    event.preventDefault();
    const form = /** @type {HTMLFormElement} */ (event.currentTarget);
    const email = /** @type {HTMLInputElement} */ (form.elements.namedItem('email'));
    const message = /** @type {HTMLTextAreaElement} */ (form.elements.namedItem('message'));

    const emailValue = email.value.trim();
    emailError = emailValue === '' ? 'Please enter your email address.' : !EMAIL_PATTERN.test(emailValue) ? 'Please enter a valid email address.' : '';
    messageError = message.value.trim() === '' ? 'Please write a message before sending.' : '';

    if (emailError !== '' || messageError !== '') {
      statusKind = '';
      statusText = '';
      const firstInvalid = emailError !== '' ? email : message;
      firstInvalid.focus();
      return;
    }

    pending = true;
    statusKind = '';
    statusText = '';
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form)
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.success) {
        statusKind = 'success';
        statusText = 'Letter sent — I will reply within a day or two.';
      } else {
        statusKind = 'error';
        statusText = 'The letter could not be sent. Please try again in a moment.';
      }
    } catch {
      statusKind = 'error';
      statusText = 'The letter could not be sent. Please check your connection and try again.';
    } finally {
      pending = false;
    }
  }
</script>

<section id="contact" class="scroll-mt-24 relative bg-lacquer text-inktext py-20 lg:py-28 overflow-hidden">
  <div class="needle-line-h absolute inset-x-0 top-0 opacity-40" aria-hidden="true"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="brush gold-text text-4xl md:text-6xl tracking-[0.02em]">
        Write to me
      </h2>
      <p class="marginalia text-inktextdim mt-5">A reply travels back by return post</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
      <div class="lg:col-span-5 flex justify-center">
        <figure class="w-full max-w-sm perspective-scene">
          <div class="medallion-float" data-reveal>
            <div class="lacquer-raised gold-edge p-3 md:p-4">
              <div class="bg-sumi border border-gold/30 p-3 md:p-4">
                <div class="border border-gold/20 p-1.5">
                  <img
                    src="/assets/professional.webp"
                    alt="Sakib Ahamed Shahon"
                    loading="lazy"
                    class="w-full aspect-[4/5] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <figcaption class="mt-5 flex justify-center" data-reveal data-reveal-delay="200">
            <span class="gold-plate rounded-sm px-4 py-1.5 marginalia text-sumi">Sakib Ahamed Shahon</span>
          </figcaption>
        </figure>
      </div>

      <div class="lg:col-span-7">
        <div class="skin-sheet rounded-sm p-6 md:p-10" data-reveal>
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            novalidate
            class="space-y-7"
            onsubmit={handleSubmit}
          >
            <input type="hidden" name="access_key" value="06898dee-aec1-4979-a6a1-194c5dc8d41d" />
            <input type="hidden" name="subject" value="Message from your portfolio" />
            <input type="hidden" name="from_name" value="sakibshahon.netlify.app" />
            <input
              type="checkbox"
              name="botcheck"
              class="hidden"
              style="display:none;"
              tabindex="-1"
              autocomplete="off"
            />

            <div class="space-y-2">
              <label for="email" class="marginalia block text-inkonpaper">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                autocomplete="email"
                placeholder="your.email@example.com"
                required
                aria-invalid={emailError !== '' ? 'true' : 'false'}
                aria-describedby={emailError !== '' ? 'email-error' : undefined}
                oninput={handleEmailInput}
                class="w-full bg-transparent text-inkonpaper text-lg py-2 rounded-none border border-t-0 border-l-0 border-r-0 border-b placeholder:text-inkonpaper/50 focus:border-b-inkonpaper/80 {emailError !== '' ? 'border-b-goldbright' : 'border-b-inkonpaper/30'}"
              />
              {#if emailError !== ''}
                <p id="email-error" class="marginalia text-goldbright mt-1">{emailError}</p>
              {/if}
            </div>

            <div class="space-y-2">
              <label for="message" class="marginalia block text-inkonpaper">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell me about your project or just say hello!"
                required
                aria-invalid={messageError !== '' ? 'true' : 'false'}
                aria-describedby={messageError !== '' ? 'message-error' : undefined}
                oninput={handleMessageInput}
                class="w-full bg-transparent text-inkonpaper text-lg py-2 px-0 resize-none rounded-none border border-t-0 border-l-0 border-r-0 border-b placeholder:text-inkonpaper/50 focus:border-b-inkonpaper/80 {messageError !== '' ? 'border-b-goldbright' : 'border-b-inkonpaper/30'}"
              ></textarea>
              {#if messageError !== ''}
                <p id="message-error" class="marginalia text-goldbright mt-1">{messageError}</p>
              {/if}
            </div>

            <button
              type="submit"
              disabled={pending}
              class="gold-plate group inline-flex w-full items-center justify-center gap-2.5 px-6 py-3.5 brush text-lg text-sumi hover:text-black transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {pending ? 'Sending the letter…' : 'Send the letter'}
              <svg
                class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <p
              aria-live="polite"
              class="marginalia text-center {statusKind === 'error' ? 'text-goldbright' : 'text-inktextdim'}"
            >
              {#if statusText !== ''}{statusText}{/if}
            </p>
          </form>
        </div>

        <div class="mt-10 text-center" data-reveal data-reveal-delay="200">
          <p class="marginalia text-inktextdim mb-5">Or reach out directly</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:sakib3201@gmail.com"
              class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-sm border border-gold/40 text-inktextdim hover:text-goldbright hover:border-gold/70 transition-colors duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sakib-shahon/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-sm border border-gold/40 text-inktextdim hover:text-goldbright hover:border-gold/70 transition-colors duration-300"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
