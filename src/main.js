let node = dom.create('<td>1</td>')

dom.after(document.getElementsByClassName('d2')[0], dom.create('<div>AfterNode</div>'))

dom.before(document.getElementsByClassName('d1')[0], dom.create('<div>BeforeNode</div>'))

dom.append(document.getElementsByClassName('d1')[0], dom.create(`<span>son</span>`))

dom.wrap(document.getElementsByClassName('w1')[0], dom.create('<div>爸爸</div>'))

const n1 = dom.empty.call(dom, empty)
console.log(n1)

dom.attr(attr, 'title', 'I am title')
const title = dom.attr(attr, 'title')
console.log(title)


dom.text(text, '我是新的文本内容')

dom.style(style, {height: '100px', background: 'red'})

dom.class.add(class1, 'red')
dom.class.add(class1, 'blue')
dom.class.remove(class1, 'red')
console.log(dom.class.has(class1, 'red'))

function fn () {
    console.log('点击了')
}
dom.on(on, 'click', fn)
dom.off(on, 'click', fn)

const nodeF1 = dom.find('.red', find1)
const nodeF2= dom.find('.red')

console.log(nodeF1, nodeF2)

console.log(dom.siblings(dom.find('.s2')[0]))


console.log(dom.next(dom.find('.n2')[0]))
