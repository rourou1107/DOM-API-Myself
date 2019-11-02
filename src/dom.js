// 对象风格、命名空间风格
window.dom = {
    /*
     * 新增节点
     * 分两种情况,传入的是一个标签名还是传入一段html代码
     */
    create(string){
        if(string.indexOf('<') !== -1){
            let container = document.createElement('template') // template可以容纳任何标签且不会再页面中显示
            container.innerHTML = string.trim() // 清除前面的空格,防止firstChild为文本节点
            return container.content.firstChild
        }else {
            return document.createElement(string)
        }
    },
    /*
     * 新增弟弟
     * 只有parent.insertBefore(newNode, node),所以需要找到当前节点的下一个节点,在下一个节点前插入节点
     */
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    /*
     * 新增哥哥
     */
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    /*
     * 新增儿子
     */
    append(parent, child) {
        parent.appendChild(child)
    },
    /*
     * 新增爸爸
     * 将爸爸节点插到node节点的前面,再将node节点作为爸爸节点的儿子
     */
    wrap(node, parent){
        dom.before(node, parent)
        parent.append(node)
    },


    /*
     * 删除节点
     */
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    /*
     * 清空节点,把node节点里面的xxx清空
     */
    empty(node) {
        let {childNodes} = node
        let arr = []
        let x = node.firstChild
        // 注意node.childNodes.length是会时时变化的,当产出其中一个孩子时,长度就减一
        while(x) {
            arr.push(this.remove(x))
            x = node.firstChild
        }
        return arr
    },


    /*
    * 设置属性/获取属性
    */
    attr(node, name, value) { // 重载
        if(arguments.length === 3) {
            // 设置属性
            node.setAttribute(name, value)
        }else if(arguments.length === 2) {
            // 获取属性
            return node.getAttribute(name)
        }
    },
    /*
     * 设置文本内容
     */
    text(node, string) { // 适配
        if(arguments.length === 2) {
            if(node.innerHTML) {
                node.innerText = string
            }else {
                node.textContent = string
            }
        }else if(arguments.length === 1) {
            return node.innerText
        }

    },
    /*
     * 设置html内容
     */
    html(node, string) { // 适配
        if(arguments.length === 2) {
            node.innerHtml = string
        }else if(arguments.length === 1) {
            return node.innerHtml
        }

    },
    /*
     * 设置css
     */
    style(node, name, value) {
        // 设置 dom.style(node, 'color', 'red')
        if(arguments.length === 3) {
            node.style[name] = value
        } else if(arguments.length === 2){
            // 获取 dom.style(node, 'color')
            if(typeof name === 'string') {
                return node[name]
            }else if (name instanceof Object) {
                // 设置 dom.style(node, {'color', 'red'})
                let object = name
                for(key in object) {
                    if(object.hasOwnProperty(key)) {
                        node.style[key] = object[key]
                    }
                }
            }
        }
    },
    /*
     * 设置class
     */
    class : {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    /*
     * 设置事件
     */
    on(node, eventName, fn){
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn){
        node.removeEventListener(eventName, fn)
    },


    /*
     * 查找元素
     */
    find(selector, scope){
        return (scope || document).querySelectorAll(selector)
    },

    /*
     * 查找爸爸
     */
    parent(node) {
        return node.parentNode
    },
    /*
     * 查找孩子
     */
    children(node){
        return node.children
    },

    /*
     * 查找兄弟节点
     */
    siblings(node) {
        console.log(node.parentNode)
        let children = node.parentNode.children
        return Array.from(children).filter(n => n !== node)
    },

    /*
     * 查找下一个节点
     */
    next(node) {
        let x = node.nextSibling
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x

    },
    /*
     * 查找上一个节点
     */
    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },
    /*
     * 遍历节点
     */
    each(nodeList, fn){
        for(let i=0;i<nodeList.length;i++){
            fn.call(null, nodeList[i])
        }
    },
    /*
     * 查找节点所在的位置
     */
    index(node){
        const list = this.children(node.parentNode)
        let i
        for(i=0;i<list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }
}

