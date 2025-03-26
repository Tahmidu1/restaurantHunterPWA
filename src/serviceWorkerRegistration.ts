export interface SWConfig {
    onUpdate?: (registration: ServiceWorkerRegistration) => void;
    onSuccess?: (registration: ServiceWorkerRegistration) => void;
  }
  
  // 2. Example isLocalhost check (unchanged)
  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]" ||
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/
      )
  );
  
  // 3. Use the SWConfig interface for config in your register function
  export function register(config?: SWConfig) {
    if (
      process.env.NODE_ENV === "production" &&
      "serviceWorker" in navigator
    ) {
      const publicUrl = new URL(
        process.env.PUBLIC_URL,
        window.location.href
      );
      if (publicUrl.origin !== window.location.origin) {
        return;
      }
  
      window.addEventListener("load", () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // Running on localhost
          checkValidServiceWorker(swUrl, config);
          navigator.serviceWorker.ready.then(() => {
            console.log(
              "This web app is being served cache-first by a service worker."
            );
          });
        } else {
          // Not localhost
          registerValidSW(swUrl, config);
        }
      });
    }
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Registers a valid service worker, and if successful, sets up a push
   * subscription to allow the user to be notified when the app is updated.
   *
   * @param {string} swUrl The URL of the service worker to register.
   * @param {Object} config An object with an `onUpdate` property, which is a
   * function that will be called when the service worker has been updated.
   * The function will be called with the registration object as its only
   * argument.
   */
/******  8716f501-dde1-4260-919b-43ec72ff2b85  *******/  }
  
  function registerValidSW(swUrl: string, config?: SWConfig) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New content is available; refresh
                console.log("New content is available; please refresh.");
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // Content is cached for offline use
                console.log("Content is cached for offline use.");
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error("Error during service worker registration:", error);
      });
  }
  
  function checkValidServiceWorker(swUrl: string, config?: SWConfig) {
    fetch(swUrl, { headers: { "Service-Worker": "script" } })
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (
          response.status === 404 ||
          (contentType != null && !contentType.includes("javascript"))
        ) {
          // No service worker found
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Service worker found
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log(
          "No internet connection found. App is running in offline mode."
        );
      });
  }
  
  export function unregister() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }