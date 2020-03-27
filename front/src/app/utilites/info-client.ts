// Набор утилит, определяющие OS клиента, его броузер, наличие
// фонтов у клиента

export class InfoClient {
    ///////////////////////////////////////////
    // косвенное Определение OS клиента по наличию фонтов
    // (не точно!!!)
    public static getOSbyFonts() {
        const fonts = ['Impact', 'Lucida Console', 'Lucida Grande', 'Lucida Sans Unicode',
            'Verdana', 'Geneva', 'Webdings', 'MS Serif', 'Tahoma', 'Trebuchet MS',
            'Palatino Linotype', 'Palatino', 'Apple Symbols'];
        const macf = [true, false, true, true, true, true, false, false, true, true, true, true, true];
        const winf = [true, true, false, true, true, false, true, true, true, true, true, false, false];
        let count = 0;
        let mcount = 0;
        let wcount = 0;
        for (let i = 0; i < fonts.length; ++i) {
            if (macf[i] === InfoClient.doesFontExist(fonts[i])) {
                mcount++;
            }
            if (winf[i] === InfoClient.doesFontExist(fonts[i])) {
                wcount++;
            }
            if (InfoClient.doesFontExist(fonts[i])) {
                count++;
            } else {
                count--;
            }
            let osByFonts = 'Not detected';
            if (mcount > wcount) {
                osByFonts = 'Mac';
            } else if (mcount < wcount) {
                osByFonts = 'Windows';
            }
            if (count < 0) {
                osByFonts = 'Linux';
            }
            return osByFonts;
        }
    }

    // функция, определляющая наличие шрифта в системе
    public static doesFontExist(fontName) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const text = 'abcdefghijklmnopqrstuvwxyz0123456789';
        context.font = '72px monospace';
        const baselineSize = context.measureText(text).width;
        context.font = '72px \'' + fontName + '\', monospace';
        const newSize = context.measureText(text).width;
        // delete canvas;
        if (newSize === baselineSize) {
            return false;
        } else {
            return true;
        }
    }

    // Определение OS клиента, где работает приложение - по заголовку
    public static getOS() {
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        let os = null;
        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
        }

        return os;
    }

    public static getBrowserName() {
        const agentString = window.navigator.userAgent.toLowerCase();
        let clnt = '';
        switch (true) {
            case agentString.indexOf('edge') > -1:
                clnt = 'edge';
                break;
            case agentString.indexOf('opr') > -1 && !!(window as any).opr:
                clnt = 'opera';
                break;
            case agentString.indexOf('chrome') > -1 && !!(window as any).chrome:
                clnt = 'chrome';
                break;
            case agentString.indexOf('trident') > -1:
                clnt = 'ie';
                break;
            case agentString.indexOf('firefox') > -1:
                clnt = 'firefox';
                break;
            case agentString.indexOf('safari') > -1:
                clnt = 'safari';
                break;
            default:
                clnt = 'other';
        }
        return {shortname: clnt, fullname: agentString};
    }
}
