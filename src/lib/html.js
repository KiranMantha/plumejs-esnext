var attr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
var node = /<[a-z][^>]+$/i;
var notNode = />[^<>]*$/;
var selfClosing = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig;
var trimEnd = /\s+$/;


const isNode = (template) => node.test(template);

const html = (strings, ...args) => {
    console.log(attr);
    console.log(strings, args, isNode(strings[0]));
}

export { html };

