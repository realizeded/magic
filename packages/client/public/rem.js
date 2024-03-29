(function () {
    // 把屏幕划成7.5份
    const unitRem = 100;
    const templateWidth = 750;
    function setBodyFontSize(num) {
        document.documentElement.style.fontSize = `${num}px`;

        window.bodySize = num;
    }

    function getClientWidth() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        return width > height ? height : width;
    }

    function calibration() {
        const div = document.createElement('div');
        div.style.width = '1rem';
        document.body.appendChild(div);
        const divWidth = div.offsetWidth;

        const newUnit = divWidth;
        setBodyFontSize(newUnit);
        document.body.removeChild(div);
    }

    function init() {
        const fn = () => {
            init();
        };
        if (document.readyState !== 'complete') {
            document.onreadystatechange = fn;
            return;
        }
        const clientWidth = getClientWidth();
        const precent = clientWidth / templateWidth;
        const fontSize = unitRem * precent;
        setBodyFontSize(fontSize);
        calibration();
    }

    init();

    window.onresize = init;
})();
