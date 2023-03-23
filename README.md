# 🚀 Welcome to your new awesome project!

This project has been created using **webpack scaffold**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application

## CDN links

- [ES Module](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/plume.es.js) version
- [IIFE](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/plume.iife.js) version
- [UMD](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/plume.umd.js) version

#### navigation for simple css

```html
<header>
    <nav>
    <a href="#" onclick=${(e) =>
        this.navigate(e, '/home')}>Items Route</a>
    <a href="#" onclick=${(e) =>
        this.navigate(e, '/persons')}>Persons Route</a>
    <a href="#" onclick=${(e) =>
        this.navigate(e, '/form')}>Sample Form</a>
    <a href="#" onclick=${(e) =>
        this.navigate(e, '/calculator/123', {
        name: 'kiran',
        })}>Calculator</a>
    <a href="#" onclick=${(e) =>
        this.navigate(e, '/controls')}>Controls</a>
    <a href="#" onclick=${(e) => this.navigate(e, '/editor')}>Editor</a>
    </nav>
</header>
```

#### navigation for pico css

```html
<nav class="tabs" style="margin-bottom: 20px;">
    <ul>
        <li>PlumeJs</li>
    </ul>
    <ul ref=${(node) => {
    this.tabsContainer = node;
    }}>
        <li class="${this.routePath === '/home' ? 'is-active' : ''}">
            <a href="#" onclick=${(e) => this.navigate(e, '/home')}
            >Items Route</a>
        </li>
        <li class="${this.routePath === '/persons' ? 'is-active' : ''}">
            <a href="#" onclick=${(e) => this.navigate(e, '/persons')}
            >Persons Route</a>
        </li>
        <li class="${this.routePath === '/form' ? 'is-active' : ''}">
            <a href="#" onclick=${(e) =>
            this.navigate(e, '/form')}>Form Route</a>
        </li>
        <li class="${
            this.routePath === '/calculator' ? 'is-active' : ''
        }">
            <a href="#" onclick=${(e) =>
            this.navigate(e, '/calculator', {
                name: 'kiran',
            })}>Calculator Route</a>
        </li>
        <li class="${this.routePath === '/controls' ? 'is-active' : ''}">
            <a href="#" onclick=${(e) =>
            this.navigate(e, '/controls')}>Controls</a>
        </li>
        <li class="${this.routePath === '/editor' ? 'is-active' : ''}">
            <a href="#" onclick=${(e) =>
            this.navigate(e, '/editor')}>Editor</a>
        </li>
    </ul>
</nav>
```

# Bundles

```cmd
plume.es.js   22.81 KiB / gzip: 7.13 KiB / brotliCompress: 6.22kb
plume.umd.js   15.38 KiB / gzip: 6.05 KiB / brotliCompress: 5.28kb
plume.iife.js   15.21 KiB / gzip: 5.97 KiB / brotliCompress: 5.24kb
```

# Useful links:

1. https://griffa.dev/posts/setting-up-eslint-to-work-with-new-or-proposed-javascript-features-such-as-private-class-fields./
2. https://typicode.github.io/husky/#/?id=install
3. https://alxgbsn.co.uk/2019/02/22/testing-native-es-modules-mocha-esm/
4. https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
5. https://bl.ocks.org/rstacruz/511f43265de4939f6ca729a3df7b001c
6. https://gist.github.com/rstacruz/511f43265de4939f6ca729a3df7b001c
7. https://www.reddit.com/r/node/comments/llzn11/are_most_people_not_using_esm_importexport_syntax/
8. https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html
9. https://link.medium.com/W1eXCzzHkmb
10. https://css-tricks.com/styling-in-the-shadow-dom-with-css-shadow-parts/
11. https://gomakethings.com/dom-diffing-with-vanilla-js/

# next steps

creating blog using [an editor like this](https://levelup.gitconnected.com/an-open-source-medium-like-wysiwyg-editor-1258d3efdf92)
https://awesomeopensource.com/project/JefMari/awesome-wysiwyg

https://stackoverflow.com/questions/47102233/how-do-i-use-markdown-it-js-to-parse-content-in-a-div

# todo

1. add parammap to current route to get query params

checked svg:
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23FFF' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E

unchecked svg:
