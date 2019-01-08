/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') { 
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
	let windowHeight = window.screen.height;
	let height;
	let setTop;
	let paddingBottom;
	let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll',() => {
       loadMore();
    }, false)
    //运动开始时获取元素 高度 和 offseTop, pading, margin
	element.addEventListener('touchstart',() => {
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element,'paddingBottom');
        marginBottom = getStyle(element,'marginBottom');
    },{passive: true})

    //运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove',() => {
       loadMore();
    },{passive: true})

    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
    element.addEventListener('touchend',() => {
       	oldScrollTop = document.body.scrollTop;
       	moveEnd();
    },{passive: true})
    
    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            }else{
            	cancelAnimationFrame(requestFram);
            	//为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
            	height = element.offsetHeight;
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
       showBackFun();
    }, false)
    document.addEventListener('touchstart',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchmove',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchend',() => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    },{passive: true})
    
    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        }else{
            callback(false);
        }
    }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    }else if(duration instanceof String){
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") { 
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        }else{
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr])*rootSize);
        }else{
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0;  //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch(mode){
                case 'ease-out': 
                    speedBase = iCurrent;
                    intervalTime = duration*5/400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration*20/400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr])/duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration*5/400; 
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch(mode){
                case 'ease-out': 
                    status = iCurrent != target[attr]; 
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr]; 
            }

            if (status) {
                flag = false; 
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                }else{
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}

/**
 * 元素点击事件
 */
export const clickUtil = (obj) => {
    let {
        el,//操作的元素
        //target,//el下响应的元素
        activeClass,//点击类
        type = 'change',//点击类型 可以是 change add 默认是change
        callback,//点击回调
        beforeClick,//点击之前执行的函数 返回true 则不继续执行
        overMaxNum,//点击类型为add是 点击的个数超过最多的个数 调用的方法 必须跟maxNum配合使用 参数为 点击的元素  最多点击个数
        maxNum,//点击类型为add时 最多的数量
    } = obj;
    switch (type) {
        case 'change':
            //点击之前执行的方法
            if (beforeClick) {
                let isBreak = beforeClick(el);

                //返回ture则取消继续执行 返回flase或者空继续
                if(isBreak) return;
            }

            //如果已经有点击类，则不继续执行
            if ($(el).hasClass(activeClass)) {
                return;
            }

            //给点击元素添加类
            $(el).addClass(activeClass).siblings().removeClass(activeClass);

            //执行回调函数
            if (callback) {
                callback(el);
            }
            break;
        case 'add':
            //点击之前执行的方法
            if (beforeClick) {
                let isBreak = beforeClick(el);

                //返回ture则取消继续执行 返回flase或者空继续
                if(isBreak) return;
            }

            if ($(el).hasClass(activeClass)) {
                $(el).removeClass(activeClass)
            } else {
                //点击的数量大于了最大数量 则结束
                if (maxNum && $(el).siblings().filter(() => $(this).hasClass(activeClass)).length >= maxNum) {
                    if(overMaxNum) {
                        overMaxNum(el, maxNum);
                    }
                    return;
                }
                $(el).addClass(activeClass);
            }

            if (callback) {
                callback(this)
            }
            break;
    }
}

/*function clickUtil(arr) {
    if(Array.isArray(arr)) {
        for(var i = 0, len = arr.length; i < len; i++) {
            var obj = arr[i];
            var type = obj.type || 'change',//点击类型 可以是 change add 默认是change
                el = obj.el,//操作的元素
                target = obj.target || null,//el下响应的元素
                activeClass = obj.activeClass,//点击类
                callback = obj.callback,//点击回调
                beforeClick = obj.beforeClick,//点击之前执行的函数 返回true 则不继续执行
                overMaxNum = obj.overMaxNum,//点击类型为add是 点击的个数超过最多的个数 调用的方法 必须跟maxNum配合使用 参数为 点击的元素  最多点击个数
                maxNum = obj.maxNum;//点击类型为add时 最多的数量
            //点击切换样式
            if (type == 'change') {
                (function(el,activeClass,callback,beforeClick,target) {
                    $(el).on('click',target, function () {
                        //点击之前执行的方法
                        if (beforeClick) {
                            var isBreak = beforeClick(this)
                            //返回ture则取消继续执行 返回flase或者空继续
                            if(isBreak) return
                        }

                        if ($(this).hasClass(activeClass)) {
                            return;
                        }
                        $(el+ (target? ' ' + target : '')).removeClass(activeClass);
                        $(this).addClass(activeClass);
                        //执行回调函数
                        if (callback) {
                            callback(this);
                        }
                    });
                })(el,activeClass,callback,beforeClick,target);
            }
            //点击增加样式
            if (type == 'add') {
                (function (el, activeClass, callback, beforeClick, maxNum, target, overMaxNum) {
                    $(el).on('click', target, function () {
                        //点击之前执行的方法
                        if (beforeClick) {
                            var isBreak = beforeClick(this);
                            if (isBreak) return;
                        }
                        if ($(this).hasClass(activeClass)) {
                            $(this).removeClass(activeClass);
                        } else {
                            //点击的数量大于了最大数量 则结束
                            if (maxNum && $(el+(target? ' ' + target : '')).filter('.' + activeClass).length >= maxNum) {
                                if(overMaxNum) {
                                    overMaxNum(this, maxNum)
                                }
                                return;
                            }
                            $(this).addClass(activeClass);
                        }
                        if (callback) {
                            callback(this)
                        }
                    });
                })(el, activeClass, callback, beforeClick, maxNum, target, overMaxNum);
            }
        }
    }
}*/
