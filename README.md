# 🚀 Welcome to PlumeJS!

This project has been created using **webpack scaffold**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application

# Bundles

## Single Package

```cmd
plume.es.js   28.28 KiB / gzip: 8.57 KiB / brotliCompress: 7.46kb
plume.umd.js   18.91 KiB / gzip: 7.19 KiB / brotliCompress: 6.30kb
plume.iife.js   18.74 KiB / gzip: 7.12 KiB / brotliCompress: 6.24kb
```

## Isolated Packages

### Core

```cmd
core/index.es.js   17.44 KiB / gzip: 5.76 KiB / brotliCompress: 7.46kb
core/index.umd.js   11.99 KiB / gzip: 5.00 KiB / brotliCompress: 4.34kb
core/index.iife.js   11.81 KiB / gzip: 4.92 KiB / brotliCompress: 4.29kb
```

### Router

```cmd
router/index.es.js   23.25 KiB / gzip: 7.33 KiB / brotliCompress: 6.39kb
router/index.umd.js   15.90 KiB / gzip: 6.21 KiB / brotliCompress: 5.46kb
router/index.iife.js   15.73 KiB / gzip: 6.14 KiB / brotliCompress: 5.37kb
```

### Forms

```cmd
forms/index.es.js   5.10 KiB / gzip: 1.68 KiB / brotliCompress: 1.43kb
forms/index.umd.js   3.34 KiB / gzip: 1.42 KiB / brotliCompress: 1.21kb
forms/index.iife.js   3.17 KiB / gzip: 1.35 KiB / brotliCompress: 1.15kb
```

# CDN links

## Global Package

- [ES Module](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/plume.es.js) version
- [IIFE](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/plume.iife.js) version
- [UMD](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/plume.umd.js) version

## Isolated Packages

### Core

- [ES Module](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/core/index.es.js) version
- [IIFE](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/core/index.iife.js) version
- [UMD](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/core/index.umd.js) version

### Router

- [ES Module](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/forms/index.es.js) version
- [IIFE](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/forms/index.iife.js) version
- [UMD](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/forms/index.umd.js) version

### Forms

- [ES Module](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/forms/index.es.js) version
- [IIFE](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/forms/index.iife.js) version
- [UMD](https://cdn.jsdelivr.net/gh/kiranmantha/plumejs-esnext/build/forms/index.umd.js) version

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
