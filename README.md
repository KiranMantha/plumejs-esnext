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