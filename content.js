(function () {
    document.addEventListener('yt-navigate-finish', function (event) {
        if (location.pathname === '/watch') {
            initiateObserverAndObserve();
        }
    });

    var config = {
        childList: true,
        attributes: true,
        subtree: true,
        characterData: true
    };

    function initiateObserverAndObserve() {
        var observer = new MutationObserver(function (mutations) {
            if (!document.contains(document.querySelector('.ytp-settings-button'))) {
                return;
            }

            observer.disconnect();
            setTimeout(selectPreferredQuality, 100);
        });

        observer.observe(document.body, config);
    }

    var selectPreferredQuality = function () {
        var settingsButton = document.querySelector('.ytp-settings-button');
        if (settingsButton) {
            settingsButton.click();
            
            setTimeout(function() {
                var qualityMenu = document.querySelector('.ytp-panel-menu .ytp-quality-menu');
                if (qualityMenu) {
                    var qualityItems = qualityMenu.querySelectorAll('.ytp-menuitem');
                    if (qualityItems.length) {
                        qualityItems[0].click(); // Select the first option, which should be the highest quality.
                    }
                }
                // Close the settings menu after selecting the quality.
                if (settingsButton) {
                    settingsButton.click();
                }
            }, 100);
        }
    };
    
})();
