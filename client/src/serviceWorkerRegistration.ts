export interface SWConfig {
    onUpdate?: (registration: ServiceWorkerRegistration) => void;
    onSuccess?: (registration: ServiceWorkerRegistration) => void;
  }
  
  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]" ||
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/
      )
  );
  
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
  }
  
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