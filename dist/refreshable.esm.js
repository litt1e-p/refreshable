var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
import { computed as t, defineAsyncComponent as e, reactive as o, watch as n, openBlock as i, createElementBlock as r, createElementVNode as s, normalizeClass as a, toDisplayString as l, createBlock as h, resolveDynamicComponent as c, unref as u, normalizeStyle as p, createCommentVNode as d, ref as f, onMounted as y, onActivated as m, onBeforeUnmount as v, nextTick as g, renderSlot as k, withDirectives as w, createVNode as T, vShow as b, pushScopeId as S, popScopeId as P } from "vue";
/*!
 * better-scroll / core
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var x = function(t2, e2) {
  return (x = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
    t3.__proto__ = e3;
  } || function(t3, e3) {
    for (var o2 in e3)
      Object.prototype.hasOwnProperty.call(e3, o2) && (t3[o2] = e3[o2]);
  })(t2, e2);
};
function E(t2, e2) {
  function o2() {
    this.constructor = t2;
  }
  x(t2, e2), t2.prototype = e2 === null ? Object.create(e2) : (o2.prototype = e2.prototype, new o2());
}
var D = function() {
  return (D = Object.assign || function(t2) {
    for (var e2, o2 = 1, n2 = arguments.length; o2 < n2; o2++)
      for (var i2 in e2 = arguments[o2])
        Object.prototype.hasOwnProperty.call(e2, i2) && (t2[i2] = e2[i2]);
    return t2;
  }).apply(this, arguments);
};
function M() {
  for (var t2 = 0, e2 = 0, o2 = arguments.length; e2 < o2; e2++)
    t2 += arguments[e2].length;
  var n2 = Array(t2), i2 = 0;
  for (e2 = 0; e2 < o2; e2++)
    for (var r2 = arguments[e2], s2 = 0, a2 = r2.length; s2 < a2; s2++, i2++)
      n2[i2] = r2[s2];
  return n2;
}
var C = [{ sourceKey: "scroller.scrollBehaviorX.currentPos", key: "x" }, { sourceKey: "scroller.scrollBehaviorY.currentPos", key: "y" }, { sourceKey: "scroller.scrollBehaviorX.hasScroll", key: "hasHorizontalScroll" }, { sourceKey: "scroller.scrollBehaviorY.hasScroll", key: "hasVerticalScroll" }, { sourceKey: "scroller.scrollBehaviorX.contentSize", key: "scrollerWidth" }, { sourceKey: "scroller.scrollBehaviorY.contentSize", key: "scrollerHeight" }, { sourceKey: "scroller.scrollBehaviorX.maxScrollPos", key: "maxScrollX" }, { sourceKey: "scroller.scrollBehaviorY.maxScrollPos", key: "maxScrollY" }, { sourceKey: "scroller.scrollBehaviorX.minScrollPos", key: "minScrollX" }, { sourceKey: "scroller.scrollBehaviorY.minScrollPos", key: "minScrollY" }, { sourceKey: "scroller.scrollBehaviorX.movingDirection", key: "movingDirectionX" }, { sourceKey: "scroller.scrollBehaviorY.movingDirection", key: "movingDirectionY" }, { sourceKey: "scroller.scrollBehaviorX.direction", key: "directionX" }, { sourceKey: "scroller.scrollBehaviorY.direction", key: "directionY" }, { sourceKey: "scroller.actions.enabled", key: "enabled" }, { sourceKey: "scroller.animater.pending", key: "pending" }, { sourceKey: "scroller.animater.stop", key: "stop" }, { sourceKey: "scroller.scrollTo", key: "scrollTo" }, { sourceKey: "scroller.scrollBy", key: "scrollBy" }, { sourceKey: "scroller.scrollToElement", key: "scrollToElement" }, { sourceKey: "scroller.resetPosition", key: "resetPosition" }];
function B(t2) {
  console.error("[BScroll warn]: " + t2);
}
var O = typeof window != "undefined", L = O && navigator.userAgent.toLowerCase(), Y = !(!L || !/wechatdevtools/.test(L)), H = L && L.indexOf("android") > 0, z = function() {
  if (typeof L == "string") {
    var t2 = /os (\d\d?_\d(_\d)?)/.exec(L);
    if (!t2)
      return false;
    var e2 = t2[1].split("_").map(function(t3) {
      return parseInt(t3, 10);
    });
    return !!(e2[0] === 13 && e2[1] >= 4);
  }
  return false;
}(), X = false;
if (O) {
  try {
    var _ = {};
    Object.defineProperty(_, "passive", { get: function() {
      X = true;
    } }), window.addEventListener("test-passive", function() {
    }, _);
  } catch (t2) {
  }
}
function A() {
  return window.performance && window.performance.now && window.performance.timing ? window.performance.now() + window.performance.timing.navigationStart : +new Date();
}
var N = function(t2, e2) {
  for (var o2 in e2)
    t2[o2] = e2[o2];
  return t2;
};
function F(t2) {
  return t2 == null;
}
function I(t2, e2, o2) {
  return t2 < e2 ? e2 : t2 > o2 ? o2 : t2;
}
var R = O && document.createElement("div").style, j = function() {
  if (!O)
    return false;
  for (var t2 = 0, e2 = [{ key: "standard", value: "transform" }, { key: "webkit", value: "webkitTransform" }, { key: "Moz", value: "MozTransform" }, { key: "O", value: "OTransform" }, { key: "ms", value: "msTransform" }]; t2 < e2.length; t2++) {
    var o2 = e2[t2];
    if (R[o2.value] !== void 0)
      return o2.key;
  }
  return false;
}();
function U(t2) {
  return j === false ? t2 : j === "standard" ? t2 === "transitionEnd" ? "transitionend" : t2 : j + t2.charAt(0).toUpperCase() + t2.substr(1);
}
function W(t2) {
  return typeof t2 == "string" ? document.querySelector(t2) : t2;
}
function K(t2, e2, o2, n2) {
  var i2 = X ? { passive: false, capture: !!n2 } : !!n2;
  t2.addEventListener(e2, o2, i2);
}
function V(t2, e2, o2, n2) {
  t2.removeEventListener(e2, o2, { capture: !!n2 });
}
function q(t2) {
  for (var e2 = 0, o2 = 0; t2; )
    e2 -= t2.offsetLeft, o2 -= t2.offsetTop, t2 = t2.offsetParent;
  return { left: e2, top: o2 };
}
j && j !== "standard" && j.toLowerCase();
var $ = U("transform"), G = U("transition"), Z = O && U("perspective") in R, J = O && ("ontouchstart" in window || Y), Q = O && G in R, tt = { transform: $, transition: G, transitionTimingFunction: U("transitionTimingFunction"), transitionDuration: U("transitionDuration"), transitionDelay: U("transitionDelay"), transformOrigin: U("transformOrigin"), transitionEnd: U("transitionEnd"), transitionProperty: U("transitionProperty") }, et = { touchstart: 1, touchmove: 1, touchend: 1, touchcancel: 1, mousedown: 2, mousemove: 2, mouseup: 2 };
function ot(t2) {
  if (t2 instanceof window.SVGElement) {
    var e2 = t2.getBoundingClientRect();
    return { top: e2.top, left: e2.left, width: e2.width, height: e2.height };
  }
  return { top: t2.offsetTop, left: t2.offsetLeft, width: t2.offsetWidth, height: t2.offsetHeight };
}
function nt(t2, e2) {
  for (var o2 in e2)
    if (e2[o2].test(t2[o2]))
      return true;
  return false;
}
var it = nt;
function rt(t2, e2) {
  var o2;
  e2 === void 0 && (e2 = "click"), t2.type === "mouseup" ? o2 = t2 : t2.type !== "touchend" && t2.type !== "touchcancel" || (o2 = t2.changedTouches[0]);
  var n2, i2 = {};
  o2 && (i2.screenX = o2.screenX || 0, i2.screenY = o2.screenY || 0, i2.clientX = o2.clientX || 0, i2.clientY = o2.clientY || 0);
  var r2 = { ctrlKey: t2.ctrlKey, shiftKey: t2.shiftKey, altKey: t2.altKey, metaKey: t2.metaKey };
  if (typeof MouseEvent != "undefined")
    try {
      n2 = new MouseEvent(e2, N(D({ bubbles: true, cancelable: true }, r2), i2));
    } catch (t3) {
      s2();
    }
  else
    s2();
  function s2() {
    (n2 = document.createEvent("Event")).initEvent(e2, true, true), N(n2, i2);
  }
  n2.forwardedTouchEvent = true, n2._constructed = true, t2.target.dispatchEvent(n2);
}
var st = { swipe: { style: "cubic-bezier(0.23, 1, 0.32, 1)", fn: function(t2) {
  return 1 + --t2 * t2 * t2 * t2 * t2;
} }, swipeBounce: { style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fn: function(t2) {
  return t2 * (2 - t2);
} }, bounce: { style: "cubic-bezier(0.165, 0.84, 0.44, 1)", fn: function(t2) {
  return 1 - --t2 * t2 * t2 * t2;
} } }, at = O && window;
function lt() {
}
var ht = O ? at.requestAnimationFrame || at.webkitRequestAnimationFrame || at.mozRequestAnimationFrame || at.oRequestAnimationFrame || function(t2) {
  return window.setTimeout(t2, t2.interval || 16.666666666666668);
} : lt, ct = O ? at.cancelAnimationFrame || at.webkitCancelAnimationFrame || at.mozCancelAnimationFrame || at.oCancelAnimationFrame || function(t2) {
  window.clearTimeout(t2);
} : lt, ut = function(t2) {
}, pt = { enumerable: true, configurable: true, get: ut, set: ut };
var dt = function() {
  function t2(t3) {
    this.events = {}, this.eventTypes = {}, this.registerType(t3);
  }
  return t2.prototype.on = function(t3, e2, o2) {
    return o2 === void 0 && (o2 = this), this.hasType(t3), this.events[t3] || (this.events[t3] = []), this.events[t3].push([e2, o2]), this;
  }, t2.prototype.once = function(t3, e2, o2) {
    var n2 = this;
    o2 === void 0 && (o2 = this), this.hasType(t3);
    var i2 = function() {
      for (var r2 = [], s2 = 0; s2 < arguments.length; s2++)
        r2[s2] = arguments[s2];
      n2.off(t3, i2);
      var a2 = e2.apply(o2, r2);
      if (a2 === true)
        return a2;
    };
    return i2.fn = e2, this.on(t3, i2), this;
  }, t2.prototype.off = function(t3, e2) {
    if (!t3 && !e2)
      return this.events = {}, this;
    if (t3) {
      if (this.hasType(t3), !e2)
        return this.events[t3] = [], this;
      var o2 = this.events[t3];
      if (!o2)
        return this;
      for (var n2 = o2.length; n2--; )
        (o2[n2][0] === e2 || o2[n2][0] && o2[n2][0].fn === e2) && o2.splice(n2, 1);
      return this;
    }
  }, t2.prototype.trigger = function(t3) {
    for (var e2 = [], o2 = 1; o2 < arguments.length; o2++)
      e2[o2 - 1] = arguments[o2];
    this.hasType(t3);
    var n2 = this.events[t3];
    if (n2)
      for (var i2, r2 = n2.length, s2 = M(n2), a2 = 0; a2 < r2; a2++) {
        var l2 = s2[a2], h2 = l2[0], c2 = l2[1];
        if (h2 && (i2 = h2.apply(c2, e2)) === true)
          return i2;
      }
  }, t2.prototype.registerType = function(t3) {
    var e2 = this;
    t3.forEach(function(t4) {
      e2.eventTypes[t4] = t4;
    });
  }, t2.prototype.destroy = function() {
    this.events = {}, this.eventTypes = {};
  }, t2.prototype.hasType = function(t3) {
    var e2 = this.eventTypes;
    e2[t3] === t3 || B('EventEmitter has used unknown event type: "' + t3 + '", should be oneof [' + Object.keys(e2).map(function(t4) {
      return JSON.stringify(t4);
    }) + "]");
  }, t2;
}(), ft = function() {
  function t2(t3, e2) {
    this.wrapper = t3, this.events = e2, this.addDOMEvents();
  }
  return t2.prototype.destroy = function() {
    this.removeDOMEvents(), this.events = [];
  }, t2.prototype.addDOMEvents = function() {
    this.handleDOMEvents(K);
  }, t2.prototype.removeDOMEvents = function() {
    this.handleDOMEvents(V);
  }, t2.prototype.handleDOMEvents = function(t3) {
    var e2 = this, o2 = this.wrapper;
    this.events.forEach(function(n2) {
      t3(o2, n2.name, e2, !!n2.capture);
    });
  }, t2.prototype.handleEvent = function(t3) {
    var e2 = t3.type;
    this.events.some(function(o2) {
      return o2.name === e2 && (o2.handler(t3), true);
    });
  }, t2;
}(), yt = function(t2) {
  function e2() {
    var e3 = t2.call(this) || this;
    return e3.startX = 0, e3.startY = 0, e3.scrollX = false, e3.scrollY = true, e3.freeScroll = false, e3.directionLockThreshold = 0, e3.eventPassthrough = "", e3.click = false, e3.dblclick = false, e3.tap = "", e3.bounce = { top: true, bottom: true, left: true, right: true }, e3.bounceTime = 800, e3.momentum = true, e3.momentumLimitTime = 300, e3.momentumLimitDistance = 15, e3.swipeTime = 2500, e3.swipeBounceTime = 500, e3.deceleration = 15e-4, e3.flickLimitTime = 200, e3.flickLimitDistance = 100, e3.resizePolling = 60, e3.probeType = 0, e3.stopPropagation = false, e3.preventDefault = true, e3.preventDefaultException = { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/ }, e3.tagException = { tagName: /^TEXTAREA$/ }, e3.HWCompositing = true, e3.useTransition = true, e3.bindToWrapper = false, e3.bindToTarget = false, e3.disableMouse = J, e3.disableTouch = !J, e3.autoBlur = true, e3.autoEndDistance = 5, e3.outOfBoundaryDampingFactor = 1 / 3, e3.specifiedIndexAsContent = 0, e3.quadrant = 1, e3;
  }
  return E(e2, t2), e2.prototype.merge = function(t3) {
    if (!t3)
      return this;
    for (var e3 in t3)
      e3 !== "bounce" ? this[e3] = t3[e3] : this.bounce = this.resolveBounce(t3[e3]);
    return this;
  }, e2.prototype.process = function() {
    return this.translateZ = this.HWCompositing && Z ? " translateZ(1px)" : "", this.useTransition = this.useTransition && Q, this.preventDefault = !this.eventPassthrough && this.preventDefault, this.scrollX = this.eventPassthrough !== "horizontal" && this.scrollX, this.scrollY = this.eventPassthrough !== "vertical" && this.scrollY, this.freeScroll = this.freeScroll && !this.eventPassthrough, this.scrollX = !!this.freeScroll || this.scrollX, this.scrollY = !!this.freeScroll || this.scrollY, this.directionLockThreshold = this.eventPassthrough ? 0 : this.directionLockThreshold, this;
  }, e2.prototype.resolveBounce = function(t3) {
    var e3 = { top: true, right: true, bottom: true, left: true };
    return typeof t3 == "object" ? N(e3, t3) : t3 ? e3 : { top: false, right: false, bottom: false, left: false };
  }, e2;
}(function() {
}), mt = function() {
  function t2(t3, e2) {
    this.wrapper = t3, this.options = e2, this.hooks = new dt(["beforeStart", "start", "move", "end", "click"]), this.handleDOMEvents();
  }
  return t2.prototype.handleDOMEvents = function() {
    var t3 = this.options, e2 = t3.bindToWrapper, o2 = t3.disableMouse, n2 = t3.disableTouch, i2 = t3.click, r2 = this.wrapper, s2 = e2 ? r2 : window, a2 = [], l2 = [], h2 = !n2, c2 = !o2;
    i2 && a2.push({ name: "click", handler: this.click.bind(this), capture: true }), h2 && (a2.push({ name: "touchstart", handler: this.start.bind(this) }), l2.push({ name: "touchmove", handler: this.move.bind(this) }, { name: "touchend", handler: this.end.bind(this) }, { name: "touchcancel", handler: this.end.bind(this) })), c2 && (a2.push({ name: "mousedown", handler: this.start.bind(this) }), l2.push({ name: "mousemove", handler: this.move.bind(this) }, { name: "mouseup", handler: this.end.bind(this) })), this.wrapperEventRegister = new ft(r2, a2), this.targetEventRegister = new ft(s2, l2);
  }, t2.prototype.beforeHandler = function(t3, e2) {
    var o2 = this.options, n2 = o2.preventDefault, i2 = o2.stopPropagation, r2 = o2.preventDefaultException;
    ({ start: function() {
      return n2 && !nt(t3.target, r2);
    }, end: function() {
      return n2 && !nt(t3.target, r2);
    }, move: function() {
      return n2;
    } })[e2]() && t3.preventDefault(), i2 && t3.stopPropagation();
  }, t2.prototype.setInitiated = function(t3) {
    t3 === void 0 && (t3 = 0), this.initiated = t3;
  }, t2.prototype.start = function(t3) {
    var e2 = et[t3.type];
    if (!this.initiated || this.initiated === e2) {
      if (this.setInitiated(e2), it(t3.target, this.options.tagException))
        this.setInitiated();
      else if ((e2 !== 2 || t3.button === 0) && !this.hooks.trigger(this.hooks.eventTypes.beforeStart, t3)) {
        this.beforeHandler(t3, "start");
        var o2 = t3.touches ? t3.touches[0] : t3;
        this.pointX = o2.pageX, this.pointY = o2.pageY, this.hooks.trigger(this.hooks.eventTypes.start, t3);
      }
    }
  }, t2.prototype.move = function(t3) {
    if (et[t3.type] === this.initiated) {
      this.beforeHandler(t3, "move");
      var e2 = t3.touches ? t3.touches[0] : t3, o2 = e2.pageX - this.pointX, n2 = e2.pageY - this.pointY;
      if (this.pointX = e2.pageX, this.pointY = e2.pageY, !this.hooks.trigger(this.hooks.eventTypes.move, { deltaX: o2, deltaY: n2, e: t3 })) {
        var i2 = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft, r2 = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop, s2 = this.pointX - i2, a2 = this.pointY - r2, l2 = this.options.autoEndDistance;
        (s2 > document.documentElement.clientWidth - l2 || a2 > document.documentElement.clientHeight - l2 || s2 < l2 || a2 < l2) && this.end(t3);
      }
    }
  }, t2.prototype.end = function(t3) {
    et[t3.type] === this.initiated && (this.setInitiated(), this.beforeHandler(t3, "end"), this.hooks.trigger(this.hooks.eventTypes.end, t3));
  }, t2.prototype.click = function(t3) {
    this.hooks.trigger(this.hooks.eventTypes.click, t3);
  }, t2.prototype.setContent = function(t3) {
    t3 !== this.wrapper && (this.wrapper = t3, this.rebindDOMEvents());
  }, t2.prototype.rebindDOMEvents = function() {
    this.wrapperEventRegister.destroy(), this.targetEventRegister.destroy(), this.handleDOMEvents();
  }, t2.prototype.destroy = function() {
    this.wrapperEventRegister.destroy(), this.targetEventRegister.destroy(), this.hooks.destroy();
  }, t2;
}(), vt = { x: ["translateX", "px"], y: ["translateY", "px"] }, gt = function() {
  function t2(t3) {
    this.setContent(t3), this.hooks = new dt(["beforeTranslate", "translate"]);
  }
  return t2.prototype.getComputedPosition = function() {
    var t3 = window.getComputedStyle(this.content, null)[tt.transform].split(")")[0].split(", ");
    return { x: +(t3[12] || t3[4]) || 0, y: +(t3[13] || t3[5]) || 0 };
  }, t2.prototype.translate = function(t3) {
    var e2 = [];
    Object.keys(t3).forEach(function(o2) {
      if (vt[o2]) {
        var n2 = vt[o2][0];
        if (n2) {
          var i2 = vt[o2][1], r2 = t3[o2];
          e2.push(n2 + "(" + r2 + i2 + ")");
        }
      }
    }), this.hooks.trigger(this.hooks.eventTypes.beforeTranslate, e2, t3), this.style[tt.transform] = e2.join(" "), this.hooks.trigger(this.hooks.eventTypes.translate, t3);
  }, t2.prototype.setContent = function(t3) {
    this.content !== t3 && (this.content = t3, this.style = t3.style);
  }, t2.prototype.destroy = function() {
    this.hooks.destroy();
  }, t2;
}(), kt = function() {
  function t2(t3, e2, o2) {
    this.translater = e2, this.options = o2, this.timer = 0, this.hooks = new dt(["move", "end", "beforeForceStop", "forceStop", "callStop", "time", "timeFunction"]), this.setContent(t3);
  }
  return t2.prototype.translate = function(t3) {
    this.translater.translate(t3);
  }, t2.prototype.setPending = function(t3) {
    this.pending = t3;
  }, t2.prototype.setForceStopped = function(t3) {
    this.forceStopped = t3;
  }, t2.prototype.setCallStop = function(t3) {
    this.callStopWhenPending = t3;
  }, t2.prototype.setContent = function(t3) {
    this.content !== t3 && (this.content = t3, this.style = t3.style, this.stop());
  }, t2.prototype.clearTimer = function() {
    this.timer && (ct(this.timer), this.timer = 0);
  }, t2.prototype.destroy = function() {
    this.hooks.destroy(), ct(this.timer);
  }, t2;
}(), wt = function(t2) {
  function e2() {
    return t2 !== null && t2.apply(this, arguments) || this;
  }
  return E(e2, t2), e2.prototype.startProbe = function(t3, e3) {
    var o2 = this, n2 = t3, i2 = function() {
      var r2 = o2.translater.getComputedPosition();
      (function(t4, e4, o3, n3) {
        var i3 = function(t5, e5) {
          var o4 = t5 - e5;
          return o4 > 0 ? -1 : o4 < 0 ? 1 : 0;
        }, r3 = i3(e4.x, t4.x), s2 = i3(e4.y, t4.y), a2 = o3.x - n3.x, l2 = o3.y - n3.y;
        return r3 * a2 <= 0 && s2 * l2 <= 0;
      })(t3, e3, r2, n2) && o2.hooks.trigger(o2.hooks.eventTypes.move, r2), o2.pending || (o2.callStopWhenPending ? o2.callStopWhenPending = false : o2.hooks.trigger(o2.hooks.eventTypes.end, r2)), n2 = r2, o2.pending && (o2.timer = ht(i2));
    };
    this.callStopWhenPending && this.setCallStop(false), ct(this.timer), i2();
  }, e2.prototype.transitionTime = function(t3) {
    t3 === void 0 && (t3 = 0), this.style[tt.transitionDuration] = t3 + "ms", this.hooks.trigger(this.hooks.eventTypes.time, t3);
  }, e2.prototype.transitionTimingFunction = function(t3) {
    this.style[tt.transitionTimingFunction] = t3, this.hooks.trigger(this.hooks.eventTypes.timeFunction, t3);
  }, e2.prototype.transitionProperty = function() {
    this.style[tt.transitionProperty] = tt.transform;
  }, e2.prototype.move = function(t3, e3, o2, n2) {
    this.setPending(o2 > 0), this.transitionTimingFunction(n2), this.transitionProperty(), this.transitionTime(o2), this.translate(e3);
    var i2 = this.options.probeType === 3;
    o2 && i2 && this.startProbe(t3, e3), o2 || (this._reflow = this.content.offsetHeight, i2 && this.hooks.trigger(this.hooks.eventTypes.move, e3), this.hooks.trigger(this.hooks.eventTypes.end, e3));
  }, e2.prototype.doStop = function() {
    var t3 = this.pending;
    if (this.setForceStopped(false), this.setCallStop(false), t3) {
      this.setPending(false), ct(this.timer);
      var e3 = this.translater.getComputedPosition(), o2 = e3.x, n2 = e3.y;
      this.transitionTime(), this.translate({ x: o2, y: n2 }), this.setForceStopped(true), this.setCallStop(true), this.hooks.trigger(this.hooks.eventTypes.forceStop, { x: o2, y: n2 });
    }
    return t3;
  }, e2.prototype.stop = function() {
    this.doStop() && this.hooks.trigger(this.hooks.eventTypes.callStop);
  }, e2;
}(kt), Tt = function(t2) {
  function e2() {
    return t2 !== null && t2.apply(this, arguments) || this;
  }
  return E(e2, t2), e2.prototype.move = function(t3, e3, o2, n2) {
    if (!o2)
      return this.translate(e3), this.options.probeType === 3 && this.hooks.trigger(this.hooks.eventTypes.move, e3), void this.hooks.trigger(this.hooks.eventTypes.end, e3);
    this.animate(t3, e3, o2, n2);
  }, e2.prototype.animate = function(t3, e3, o2, n2) {
    var i2 = this, r2 = A(), s2 = r2 + o2, a2 = this.options.probeType === 3, l2 = function() {
      var h2 = A();
      if (h2 >= s2)
        return i2.translate(e3), a2 && i2.hooks.trigger(i2.hooks.eventTypes.move, e3), void i2.hooks.trigger(i2.hooks.eventTypes.end, e3);
      var c2 = n2(h2 = (h2 - r2) / o2), u2 = {};
      Object.keys(e3).forEach(function(o3) {
        var n3 = t3[o3], i3 = e3[o3];
        u2[o3] = (i3 - n3) * c2 + n3;
      }), i2.translate(u2), a2 && i2.hooks.trigger(i2.hooks.eventTypes.move, u2), i2.pending && (i2.timer = ht(l2)), i2.pending || (i2.callStopWhenPending ? i2.callStopWhenPending = false : i2.hooks.trigger(i2.hooks.eventTypes.end, e3));
    };
    this.setPending(true), this.callStopWhenPending && this.setCallStop(false), ct(this.timer), l2();
  }, e2.prototype.doStop = function() {
    var t3 = this.pending;
    if (this.setForceStopped(false), this.setCallStop(false), t3) {
      this.setPending(false), ct(this.timer);
      var e3 = this.translater.getComputedPosition();
      this.setForceStopped(true), this.setCallStop(true), this.hooks.trigger(this.hooks.eventTypes.forceStop, e3);
    }
    return t3;
  }, e2.prototype.stop = function() {
    this.doStop() && this.hooks.trigger(this.hooks.eventTypes.callStop);
  }, e2;
}(kt);
var bt, St, Pt, xt, Et = function() {
  function t2(t3, e2, o2) {
    this.wrapper = t3, this.options = o2, this.hooks = new dt(["beforeComputeBoundary", "computeBoundary", "momentum", "end", "ignoreHasScroll"]), this.refresh(e2);
  }
  return t2.prototype.start = function() {
    this.dist = 0, this.setMovingDirection(0), this.setDirection(0);
  }, t2.prototype.move = function(t3) {
    return t3 = this.hasScroll ? t3 : 0, this.setMovingDirection(t3), this.performDampingAlgorithm(t3, this.options.outOfBoundaryDampingFactor);
  }, t2.prototype.setMovingDirection = function(t3) {
    this.movingDirection = t3 > 0 ? -1 : t3 < 0 ? 1 : 0;
  }, t2.prototype.setDirection = function(t3) {
    this.direction = t3 > 0 ? -1 : t3 < 0 ? 1 : 0;
  }, t2.prototype.performDampingAlgorithm = function(t3, e2) {
    var o2 = this.currentPos + t3;
    return (o2 > this.minScrollPos || o2 < this.maxScrollPos) && (o2 = o2 > this.minScrollPos && this.options.bounces[0] || o2 < this.maxScrollPos && this.options.bounces[1] ? this.currentPos + t3 * e2 : o2 > this.minScrollPos ? this.minScrollPos : this.maxScrollPos), o2;
  }, t2.prototype.end = function(t3) {
    var e2 = { duration: 0 }, o2 = Math.abs(this.currentPos - this.startPos);
    if (this.options.momentum && t3 < this.options.momentumLimitTime && o2 > this.options.momentumLimitDistance) {
      var n2 = this.direction === -1 && this.options.bounces[0] || this.direction === 1 && this.options.bounces[1] ? this.wrapperSize : 0;
      e2 = this.hasScroll ? this.momentum(this.currentPos, this.startPos, t3, this.maxScrollPos, this.minScrollPos, n2, this.options) : { destination: this.currentPos, duration: 0 };
    } else
      this.hooks.trigger(this.hooks.eventTypes.end, e2);
    return e2;
  }, t2.prototype.momentum = function(t3, e2, o2, n2, i2, r2, s2) {
    s2 === void 0 && (s2 = this.options);
    var a2 = t3 - e2, l2 = Math.abs(a2) / o2, h2 = s2.deceleration, c2 = s2.swipeBounceTime, u2 = s2.swipeTime, p2 = { destination: t3 + l2 * l2 / h2 * (a2 < 0 ? -1 : 1), duration: Math.min(u2, 2 * l2 / h2), rate: 15 };
    return this.hooks.trigger(this.hooks.eventTypes.momentum, p2, a2), p2.destination < n2 ? (p2.destination = r2 ? Math.max(n2 - r2 / 4, n2 - r2 / p2.rate * l2) : n2, p2.duration = c2) : p2.destination > i2 && (p2.destination = r2 ? Math.min(i2 + r2 / 4, i2 + r2 / p2.rate * l2) : i2, p2.duration = c2), p2.destination = Math.round(p2.destination), p2;
  }, t2.prototype.updateDirection = function() {
    var t3 = this.currentPos - this.absStartPos;
    this.setDirection(t3);
  }, t2.prototype.refresh = function(t3) {
    var e2 = this.options.rect, o2 = e2.size, n2 = e2.position, i2 = window.getComputedStyle(this.wrapper, null).position === "static", r2 = ot(this.wrapper);
    this.wrapperSize = this.wrapper[o2 === "width" ? "clientWidth" : "clientHeight"], this.setContent(t3);
    var s2 = ot(this.content);
    this.contentSize = s2[o2], this.relativeOffset = s2[n2], i2 && (this.relativeOffset -= r2[n2]), this.computeBoundary(), this.setDirection(0);
  }, t2.prototype.setContent = function(t3) {
    t3 !== this.content && (this.content = t3, this.resetState());
  }, t2.prototype.resetState = function() {
    this.currentPos = 0, this.startPos = 0, this.dist = 0, this.setDirection(0), this.setMovingDirection(0), this.resetStartPos();
  }, t2.prototype.computeBoundary = function() {
    this.hooks.trigger(this.hooks.eventTypes.beforeComputeBoundary);
    var t3 = { minScrollPos: 0, maxScrollPos: this.wrapperSize - this.contentSize };
    t3.maxScrollPos < 0 && (t3.maxScrollPos -= this.relativeOffset, this.options.specifiedIndexAsContent === 0 && (t3.minScrollPos = -this.relativeOffset)), this.hooks.trigger(this.hooks.eventTypes.computeBoundary, t3), this.minScrollPos = t3.minScrollPos, this.maxScrollPos = t3.maxScrollPos, this.hasScroll = this.options.scrollable && this.maxScrollPos < this.minScrollPos, !this.hasScroll && this.minScrollPos < this.maxScrollPos && (this.maxScrollPos = this.minScrollPos, this.contentSize = this.wrapperSize);
  }, t2.prototype.updatePosition = function(t3) {
    this.currentPos = t3;
  }, t2.prototype.getCurrentPos = function() {
    return this.currentPos;
  }, t2.prototype.checkInBoundary = function() {
    var t3 = this.adjustPosition(this.currentPos);
    return { position: t3, inBoundary: t3 === this.getCurrentPos() };
  }, t2.prototype.adjustPosition = function(t3) {
    return this.hasScroll || this.hooks.trigger(this.hooks.eventTypes.ignoreHasScroll) ? t3 > this.minScrollPos ? t3 = this.minScrollPos : t3 < this.maxScrollPos && (t3 = this.maxScrollPos) : t3 = this.minScrollPos, t3;
  }, t2.prototype.updateStartPos = function() {
    this.startPos = this.currentPos;
  }, t2.prototype.updateAbsStartPos = function() {
    this.absStartPos = this.currentPos;
  }, t2.prototype.resetStartPos = function() {
    this.updateStartPos(), this.updateAbsStartPos();
  }, t2.prototype.getAbsDist = function(t3) {
    return this.dist += t3, Math.abs(this.dist);
  }, t2.prototype.destroy = function() {
    this.hooks.destroy();
  }, t2;
}(), Dt = ((bt = {}).yes = function(t2) {
  return true;
}, bt.no = function(t2) {
  return t2.preventDefault(), false;
}, bt), Mt = ((St = {}).horizontal = ((Pt = {}).yes = "horizontal", Pt.no = "vertical", Pt), St.vertical = ((xt = {}).yes = "vertical", xt.no = "horizontal", xt), St), Ct = function() {
  function t2(t3, e2, o2) {
    this.directionLockThreshold = t3, this.freeScroll = e2, this.eventPassthrough = o2, this.reset();
  }
  return t2.prototype.reset = function() {
    this.directionLocked = "";
  }, t2.prototype.checkMovingDirection = function(t3, e2, o2) {
    return this.computeDirectionLock(t3, e2), this.handleEventPassthrough(o2);
  }, t2.prototype.adjustDelta = function(t3, e2) {
    return this.directionLocked === "horizontal" ? e2 = 0 : this.directionLocked === "vertical" && (t3 = 0), { deltaX: t3, deltaY: e2 };
  }, t2.prototype.computeDirectionLock = function(t3, e2) {
    this.directionLocked !== "" || this.freeScroll || (t3 > e2 + this.directionLockThreshold ? this.directionLocked = "horizontal" : e2 >= t3 + this.directionLockThreshold ? this.directionLocked = "vertical" : this.directionLocked = "none");
  }, t2.prototype.handleEventPassthrough = function(t3) {
    var e2 = Mt[this.directionLocked];
    if (e2) {
      if (this.eventPassthrough === e2.yes)
        return Dt.yes(t3);
      if (this.eventPassthrough === e2.no)
        return Dt.no(t3);
    }
    return false;
  }, t2;
}(), Bt = function() {
  function t2(t3, e2, o2, n2, i2) {
    this.hooks = new dt(["start", "beforeMove", "scrollStart", "scroll", "beforeEnd", "end", "scrollEnd", "contentNotMoved", "detectMovingDirection", "coordinateTransformation"]), this.scrollBehaviorX = t3, this.scrollBehaviorY = e2, this.actionsHandler = o2, this.animater = n2, this.options = i2, this.directionLockAction = new Ct(i2.directionLockThreshold, i2.freeScroll, i2.eventPassthrough), this.enabled = true, this.bindActionsHandler();
  }
  return t2.prototype.bindActionsHandler = function() {
    var t3 = this;
    this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.start, function(e2) {
      return !t3.enabled || t3.handleStart(e2);
    }), this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.move, function(e2) {
      var o2 = e2.deltaX, n2 = e2.deltaY, i2 = e2.e;
      if (!t3.enabled)
        return true;
      var r2 = function(t4, e3, o3) {
        return o3 === 2 ? [e3, -t4] : o3 === 3 ? [-t4, -e3] : o3 === 4 ? [-e3, t4] : [t4, e3];
      }(o2, n2, t3.options.quadrant), s2 = { deltaX: r2[0], deltaY: r2[1] };
      return t3.hooks.trigger(t3.hooks.eventTypes.coordinateTransformation, s2), t3.handleMove(s2.deltaX, s2.deltaY, i2);
    }), this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.end, function(e2) {
      return !t3.enabled || t3.handleEnd(e2);
    }), this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.click, function(e2) {
      t3.enabled && !e2._constructed && t3.handleClick(e2);
    });
  }, t2.prototype.handleStart = function(t3) {
    var e2 = A();
    this.fingerMoved = false, this.contentMoved = false, this.startTime = e2, this.directionLockAction.reset(), this.scrollBehaviorX.start(), this.scrollBehaviorY.start(), this.animater.doStop(), this.scrollBehaviorX.resetStartPos(), this.scrollBehaviorY.resetStartPos(), this.hooks.trigger(this.hooks.eventTypes.start, t3);
  }, t2.prototype.handleMove = function(t3, e2, o2) {
    if (!this.hooks.trigger(this.hooks.eventTypes.beforeMove, o2)) {
      var n2 = this.scrollBehaviorX.getAbsDist(t3), i2 = this.scrollBehaviorY.getAbsDist(e2), r2 = A();
      if (this.checkMomentum(n2, i2, r2))
        return true;
      if (this.directionLockAction.checkMovingDirection(n2, i2, o2))
        return this.actionsHandler.setInitiated(), true;
      var s2 = this.directionLockAction.adjustDelta(t3, e2), a2 = this.scrollBehaviorX.getCurrentPos(), l2 = this.scrollBehaviorX.move(s2.deltaX), h2 = this.scrollBehaviorY.getCurrentPos(), c2 = this.scrollBehaviorY.move(s2.deltaY);
      if (!this.hooks.trigger(this.hooks.eventTypes.detectMovingDirection)) {
        this.fingerMoved || (this.fingerMoved = true);
        var u2 = l2 !== a2 || c2 !== h2;
        this.contentMoved || u2 || this.hooks.trigger(this.hooks.eventTypes.contentNotMoved), !this.contentMoved && u2 && (this.contentMoved = true, this.hooks.trigger(this.hooks.eventTypes.scrollStart)), this.contentMoved && u2 && (this.animater.translate({ x: l2, y: c2 }), this.dispatchScroll(r2));
      }
    }
  }, t2.prototype.dispatchScroll = function(t3) {
    t3 - this.startTime > this.options.momentumLimitTime && (this.startTime = t3, this.scrollBehaviorX.updateStartPos(), this.scrollBehaviorY.updateStartPos(), this.options.probeType === 1 && this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos())), this.options.probeType > 1 && this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
  }, t2.prototype.checkMomentum = function(t3, e2, o2) {
    return o2 - this.endTime > this.options.momentumLimitTime && e2 < this.options.momentumLimitDistance && t3 < this.options.momentumLimitDistance;
  }, t2.prototype.handleEnd = function(t3) {
    if (!this.hooks.trigger(this.hooks.eventTypes.beforeEnd, t3)) {
      var e2 = this.getCurrentPos();
      if (this.scrollBehaviorX.updateDirection(), this.scrollBehaviorY.updateDirection(), this.hooks.trigger(this.hooks.eventTypes.end, t3, e2))
        return true;
      e2 = this.ensureIntegerPos(e2), this.animater.translate(e2), this.endTime = A();
      var o2 = this.endTime - this.startTime;
      this.hooks.trigger(this.hooks.eventTypes.scrollEnd, e2, o2);
    }
  }, t2.prototype.ensureIntegerPos = function(t3) {
    this.ensuringInteger = true;
    var e2 = t3.x, o2 = t3.y, n2 = this.scrollBehaviorX, i2 = n2.minScrollPos, r2 = n2.maxScrollPos, s2 = this.scrollBehaviorY, a2 = s2.minScrollPos, l2 = s2.maxScrollPos;
    return e2 = e2 > 0 ? Math.ceil(e2) : Math.floor(e2), o2 = o2 > 0 ? Math.ceil(o2) : Math.floor(o2), { x: e2 = I(e2, r2, i2), y: o2 = I(o2, l2, a2) };
  }, t2.prototype.handleClick = function(t3) {
    nt(t3.target, this.options.preventDefaultException) || (t3.preventDefault(), t3.stopPropagation());
  }, t2.prototype.getCurrentPos = function() {
    return { x: this.scrollBehaviorX.getCurrentPos(), y: this.scrollBehaviorY.getCurrentPos() };
  }, t2.prototype.refresh = function() {
    this.endTime = 0;
  }, t2.prototype.destroy = function() {
    this.hooks.destroy();
  }, t2;
}();
function Ot(t2, e2, o2, n2) {
  var i2 = ["momentum", "momentumLimitTime", "momentumLimitDistance", "deceleration", "swipeBounceTime", "swipeTime", "outOfBoundaryDampingFactor", "specifiedIndexAsContent"].reduce(function(e3, o3) {
    return e3[o3] = t2[o3], e3;
  }, {});
  return i2.scrollable = !!t2[e2], i2.bounces = o2, i2.rect = n2, i2;
}
function Lt(t2, e2, o2) {
  o2.forEach(function(o3) {
    var n2, i2;
    typeof o3 == "string" ? n2 = i2 = o3 : (n2 = o3.source, i2 = o3.target), t2.on(n2, function() {
      for (var t3 = [], o4 = 0; o4 < arguments.length; o4++)
        t3[o4] = arguments[o4];
      return e2.trigger.apply(e2, M([i2], t3));
    });
  });
}
var Yt = function() {
  function t2(t3, e2, o2) {
    this.wrapper = t3, this.content = e2, this.resizeTimeout = 0, this.hooks = new dt(["beforeStart", "beforeMove", "beforeScrollStart", "scrollStart", "scroll", "beforeEnd", "scrollEnd", "resize", "touchEnd", "end", "flick", "scrollCancel", "momentum", "scrollTo", "minDistanceScroll", "scrollToElement", "beforeRefresh"]), this.options = o2;
    var n2, i2 = this.options.bounce, r2 = i2.left, s2 = i2.right, a2 = i2.top, l2 = i2.bottom;
    this.scrollBehaviorX = new Et(t3, e2, Ot(o2, "scrollX", [r2, s2], { size: "width", position: "left" })), this.scrollBehaviorY = new Et(t3, e2, Ot(o2, "scrollY", [a2, l2], { size: "height", position: "top" })), this.translater = new gt(this.content), this.animater = function(t4, e3, o3) {
      var n3 = o3.useTransition, i3 = {};
      return Object.defineProperty(i3, "probeType", { enumerable: true, configurable: false, get: function() {
        return o3.probeType;
      } }), n3 ? new wt(t4, e3, i3) : new Tt(t4, e3, i3);
    }(this.content, this.translater, this.options), this.actionsHandler = new mt(this.options.bindToTarget ? this.content : t3, (n2 = this.options, ["click", "bindToWrapper", "disableMouse", "disableTouch", "preventDefault", "stopPropagation", "tagException", "preventDefaultException", "autoEndDistance"].reduce(function(t4, e3) {
      return t4[e3] = n2[e3], t4;
    }, {}))), this.actions = new Bt(this.scrollBehaviorX, this.scrollBehaviorY, this.actionsHandler, this.animater, this.options);
    var h2 = this.resize.bind(this);
    this.resizeRegister = new ft(window, [{ name: "orientationchange", handler: h2 }, { name: "resize", handler: h2 }]), this.registerTransitionEnd(), this.init();
  }
  return t2.prototype.init = function() {
    var t3 = this;
    this.bindTranslater(), this.bindAnimater(), this.bindActions(), this.hooks.on(this.hooks.eventTypes.scrollEnd, function() {
      t3.togglePointerEvents(true);
    });
  }, t2.prototype.registerTransitionEnd = function() {
    this.transitionEndRegister = new ft(this.content, [{ name: tt.transitionEnd, handler: this.transitionEnd.bind(this) }]);
  }, t2.prototype.bindTranslater = function() {
    var t3 = this, e2 = this.translater.hooks;
    e2.on(e2.eventTypes.beforeTranslate, function(e3) {
      t3.options.translateZ && e3.push(t3.options.translateZ);
    }), e2.on(e2.eventTypes.translate, function(e3) {
      var o2 = t3.getCurrentPos();
      t3.updatePositions(e3), t3.actions.ensuringInteger !== true ? e3.x === o2.x && e3.y === o2.y || t3.togglePointerEvents(false) : t3.actions.ensuringInteger = false;
    });
  }, t2.prototype.bindAnimater = function() {
    var t3 = this;
    this.animater.hooks.on(this.animater.hooks.eventTypes.end, function(e2) {
      t3.resetPosition(t3.options.bounceTime) || (t3.animater.setPending(false), t3.hooks.trigger(t3.hooks.eventTypes.scrollEnd, e2));
    }), Lt(this.animater.hooks, this.hooks, [{ source: this.animater.hooks.eventTypes.move, target: this.hooks.eventTypes.scroll }, { source: this.animater.hooks.eventTypes.forceStop, target: this.hooks.eventTypes.scrollEnd }]);
  }, t2.prototype.bindActions = function() {
    var t3 = this, e2 = this.actions;
    Lt(e2.hooks, this.hooks, [{ source: e2.hooks.eventTypes.start, target: this.hooks.eventTypes.beforeStart }, { source: e2.hooks.eventTypes.start, target: this.hooks.eventTypes.beforeScrollStart }, { source: e2.hooks.eventTypes.beforeMove, target: this.hooks.eventTypes.beforeMove }, { source: e2.hooks.eventTypes.scrollStart, target: this.hooks.eventTypes.scrollStart }, { source: e2.hooks.eventTypes.scroll, target: this.hooks.eventTypes.scroll }, { source: e2.hooks.eventTypes.beforeEnd, target: this.hooks.eventTypes.beforeEnd }]), e2.hooks.on(e2.hooks.eventTypes.end, function(o2, n2) {
      return t3.hooks.trigger(t3.hooks.eventTypes.touchEnd, n2), !!t3.hooks.trigger(t3.hooks.eventTypes.end, n2) || (!(e2.fingerMoved || (t3.hooks.trigger(t3.hooks.eventTypes.scrollCancel), !t3.checkClick(o2))) || (t3.resetPosition(t3.options.bounceTime, st.bounce) ? (t3.animater.setForceStopped(false), true) : void 0));
    }), e2.hooks.on(e2.hooks.eventTypes.scrollEnd, function(o2, n2) {
      var i2 = Math.abs(o2.x - t3.scrollBehaviorX.startPos), r2 = Math.abs(o2.y - t3.scrollBehaviorY.startPos);
      if (t3.checkFlick(n2, i2, r2))
        return t3.animater.setForceStopped(false), void t3.hooks.trigger(t3.hooks.eventTypes.flick);
      t3.momentum(o2, n2) ? t3.animater.setForceStopped(false) : (e2.contentMoved && t3.hooks.trigger(t3.hooks.eventTypes.scrollEnd, o2), t3.animater.forceStopped && t3.animater.setForceStopped(false));
    });
  }, t2.prototype.checkFlick = function(t3, e2, o2) {
    if (this.hooks.events.flick.length > 1 && t3 < this.options.flickLimitTime && e2 < this.options.flickLimitDistance && o2 < this.options.flickLimitDistance && (o2 > 1 || e2 > 1))
      return true;
  }, t2.prototype.momentum = function(t3, e2) {
    var o2 = { time: 0, easing: st.swiper, newX: t3.x, newY: t3.y }, n2 = this.scrollBehaviorX.end(e2), i2 = this.scrollBehaviorY.end(e2);
    if (o2.newX = F(n2.destination) ? o2.newX : n2.destination, o2.newY = F(i2.destination) ? o2.newY : i2.destination, o2.time = Math.max(n2.duration, i2.duration), this.hooks.trigger(this.hooks.eventTypes.momentum, o2, this), o2.newX !== t3.x || o2.newY !== t3.y)
      return (o2.newX > this.scrollBehaviorX.minScrollPos || o2.newX < this.scrollBehaviorX.maxScrollPos || o2.newY > this.scrollBehaviorY.minScrollPos || o2.newY < this.scrollBehaviorY.maxScrollPos) && (o2.easing = st.swipeBounce), this.scrollTo(o2.newX, o2.newY, o2.time, o2.easing), true;
  }, t2.prototype.checkClick = function(t3) {
    var e2 = this.animater.forceStopped;
    if (this.hooks.trigger(this.hooks.eventTypes.checkClick))
      return this.animater.setForceStopped(false), true;
    if (!e2) {
      var o2 = this.options.dblclick, n2 = false;
      if (o2 && this.lastClickTime) {
        var i2 = o2.delay, r2 = i2 === void 0 ? 300 : i2;
        A() - this.lastClickTime < r2 && (n2 = true, function(t4) {
          rt(t4, "dblclick");
        }(t3));
      }
      return this.options.tap && function(t4, e3) {
        var o3 = document.createEvent("Event");
        o3.initEvent(e3, true, true), o3.pageX = t4.pageX, o3.pageY = t4.pageY, t4.target.dispatchEvent(o3);
      }(t3, this.options.tap), this.options.click && !nt(t3.target, this.options.preventDefaultException) && rt(t3), this.lastClickTime = n2 ? null : A(), true;
    }
    return false;
  }, t2.prototype.resize = function() {
    var t3 = this;
    this.actions.enabled && (H && (this.wrapper.scrollTop = 0), clearTimeout(this.resizeTimeout), this.resizeTimeout = window.setTimeout(function() {
      t3.hooks.trigger(t3.hooks.eventTypes.resize);
    }, this.options.resizePolling));
  }, t2.prototype.transitionEnd = function(t3) {
    t3.target === this.content && this.animater.pending && (this.animater.transitionTime(), this.resetPosition(this.options.bounceTime, st.bounce) || (this.animater.setPending(false), this.options.probeType !== 3 && this.hooks.trigger(this.hooks.eventTypes.scrollEnd, this.getCurrentPos())));
  }, t2.prototype.togglePointerEvents = function(t3) {
    t3 === void 0 && (t3 = true);
    for (var e2 = this.content.children.length ? this.content.children : [this.content], o2 = t3 ? "auto" : "none", n2 = 0; n2 < e2.length; n2++) {
      var i2 = e2[n2];
      i2.isBScrollContainer || (i2.style.pointerEvents = o2);
    }
  }, t2.prototype.refresh = function(t3) {
    var e2 = this.setContent(t3);
    this.hooks.trigger(this.hooks.eventTypes.beforeRefresh), this.scrollBehaviorX.refresh(t3), this.scrollBehaviorY.refresh(t3), e2 && (this.translater.setContent(t3), this.animater.setContent(t3), this.transitionEndRegister.destroy(), this.registerTransitionEnd(), this.options.bindToTarget && this.actionsHandler.setContent(t3)), this.actions.refresh(), this.wrapperOffset = q(this.wrapper);
  }, t2.prototype.setContent = function(t3) {
    var e2 = t3 !== this.content;
    return e2 && (this.content = t3), e2;
  }, t2.prototype.scrollBy = function(t3, e2, o2, n2) {
    o2 === void 0 && (o2 = 0);
    var i2 = this.getCurrentPos(), r2 = i2.x, s2 = i2.y;
    n2 = n2 || st.bounce, t3 += r2, e2 += s2, this.scrollTo(t3, e2, o2, n2);
  }, t2.prototype.scrollTo = function(t3, e2, o2, n2, i2) {
    o2 === void 0 && (o2 = 0), n2 === void 0 && (n2 = st.bounce), i2 === void 0 && (i2 = { start: {}, end: {} });
    var r2 = this.options.useTransition ? n2.style : n2.fn, s2 = this.getCurrentPos(), a2 = D({ x: s2.x, y: s2.y }, i2.start), l2 = D({ x: t3, y: e2 }, i2.end);
    if (this.hooks.trigger(this.hooks.eventTypes.scrollTo, l2), !function(t4, e3) {
      for (var o3 = 0, n3 = Object.keys(t4); o3 < n3.length; o3++) {
        var i3 = n3[o3];
        if (t4[i3] !== e3[i3])
          return false;
      }
      return true;
    }(a2, l2)) {
      var h2 = Math.abs(l2.x - a2.x), c2 = Math.abs(l2.y - a2.y);
      h2 < 1 && c2 < 1 && (o2 = 0, this.hooks.trigger(this.hooks.eventTypes.minDistanceScroll)), this.animater.move(a2, l2, o2, r2);
    }
  }, t2.prototype.scrollToElement = function(t3, e2, o2, n2, i2) {
    var r2 = W(t3), s2 = q(r2), a2 = function(t4, e3, o3) {
      return typeof t4 == "number" ? t4 : t4 ? Math.round(e3 / 2 - o3 / 2) : 0;
    };
    o2 = a2(o2, r2.offsetWidth, this.wrapper.offsetWidth), n2 = a2(n2, r2.offsetHeight, this.wrapper.offsetHeight);
    var l2 = function(t4, e3, o3, n3) {
      return t4 -= e3, t4 = n3.adjustPosition(t4 - o3);
    };
    s2.left = l2(s2.left, this.wrapperOffset.left, o2, this.scrollBehaviorX), s2.top = l2(s2.top, this.wrapperOffset.top, n2, this.scrollBehaviorY), this.hooks.trigger(this.hooks.eventTypes.scrollToElement, r2, s2) || this.scrollTo(s2.left, s2.top, e2, i2);
  }, t2.prototype.resetPosition = function(t3, e2) {
    t3 === void 0 && (t3 = 0), e2 === void 0 && (e2 = st.bounce);
    var o2 = this.scrollBehaviorX.checkInBoundary(), n2 = o2.position, i2 = o2.inBoundary, r2 = this.scrollBehaviorY.checkInBoundary(), s2 = r2.position, a2 = r2.inBoundary;
    return (!i2 || !a2) && (z && this.reflow(), this.scrollTo(n2, s2, t3, e2), true);
  }, t2.prototype.reflow = function() {
    this._reflow = this.content.offsetHeight;
  }, t2.prototype.updatePositions = function(t3) {
    this.scrollBehaviorX.updatePosition(t3.x), this.scrollBehaviorY.updatePosition(t3.y);
  }, t2.prototype.getCurrentPos = function() {
    return this.actions.getCurrentPos();
  }, t2.prototype.enable = function() {
    this.actions.enabled = true;
  }, t2.prototype.disable = function() {
    ct(this.animater.timer), this.actions.enabled = false;
  }, t2.prototype.destroy = function() {
    var t3 = this;
    ["resizeRegister", "transitionEndRegister", "actionsHandler", "actions", "hooks", "animater", "translater", "scrollBehaviorX", "scrollBehaviorY"].forEach(function(e2) {
      return t3[e2].destroy();
    });
  }, t2;
}(), Ht = function(t2) {
  function e2(e3, o2) {
    var n2 = t2.call(this, ["refresh", "contentChanged", "enable", "disable", "beforeScrollStart", "scrollStart", "scroll", "scrollEnd", "scrollCancel", "touchEnd", "flick", "destroy"]) || this, i2 = W(e3);
    return i2 ? (n2.plugins = {}, n2.options = new yt().merge(o2).process(), n2.setContent(i2).valid ? (n2.hooks = new dt(["refresh", "enable", "disable", "destroy", "beforeInitialScrollTo", "contentChanged"]), n2.init(i2), n2) : n2) : (B("Can not resolve the wrapper DOM."), n2);
  }
  return E(e2, t2), e2.use = function(t3) {
    var o2 = t3.pluginName;
    return e2.plugins.some(function(e3) {
      return t3 === e3.ctor;
    }) ? e2 : F(o2) ? (B("Plugin Class must specify plugin's name in static property by 'pluginName' field."), e2) : (e2.pluginsMap[o2] = true, e2.plugins.push({ name: o2, applyOrder: t3.applyOrder, ctor: t3 }), e2);
  }, e2.prototype.setContent = function(t3) {
    var e3 = false, o2 = true, n2 = t3.children[this.options.specifiedIndexAsContent];
    return n2 ? (e3 = this.content !== n2) && (this.content = n2) : (B("The wrapper need at least one child element to be content element to scroll."), o2 = false), { valid: o2, contentChanged: e3 };
  }, e2.prototype.init = function(t3) {
    var e3 = this;
    this.wrapper = t3, t3.isBScrollContainer = true, this.scroller = new Yt(t3, this.content, this.options), this.scroller.hooks.on(this.scroller.hooks.eventTypes.resize, function() {
      e3.refresh();
    }), this.eventBubbling(), this.handleAutoBlur(), this.enable(), this.proxy(C), this.applyPlugins(), this.refreshWithoutReset(this.content);
    var o2 = this.options, n2 = { x: o2.startX, y: o2.startY };
    this.hooks.trigger(this.hooks.eventTypes.beforeInitialScrollTo, n2) || this.scroller.scrollTo(n2.x, n2.y);
  }, e2.prototype.applyPlugins = function() {
    var t3 = this, o2 = this.options;
    e2.plugins.sort(function(t4, e3) {
      var o3, n2 = ((o3 = {}).pre = -1, o3.post = 1, o3);
      return (t4.applyOrder ? n2[t4.applyOrder] : 0) - (e3.applyOrder ? n2[e3.applyOrder] : 0);
    }).forEach(function(e3) {
      var n2 = e3.ctor;
      o2[e3.name] && typeof n2 == "function" && (t3.plugins[e3.name] = new n2(t3));
    });
  }, e2.prototype.handleAutoBlur = function() {
    this.options.autoBlur && this.on(this.eventTypes.beforeScrollStart, function() {
      var t3 = document.activeElement;
      !t3 || t3.tagName !== "INPUT" && t3.tagName !== "TEXTAREA" || t3.blur();
    });
  }, e2.prototype.eventBubbling = function() {
    Lt(this.scroller.hooks, this, [this.eventTypes.beforeScrollStart, this.eventTypes.scrollStart, this.eventTypes.scroll, this.eventTypes.scrollEnd, this.eventTypes.scrollCancel, this.eventTypes.touchEnd, this.eventTypes.flick]);
  }, e2.prototype.refreshWithoutReset = function(t3) {
    this.scroller.refresh(t3), this.hooks.trigger(this.hooks.eventTypes.refresh, t3), this.trigger(this.eventTypes.refresh, t3);
  }, e2.prototype.proxy = function(t3) {
    var e3 = this;
    t3.forEach(function(t4) {
      var o2 = t4.key, n2 = t4.sourceKey;
      !function(t5, e4, o3) {
        pt.get = function() {
          return function(t6, e5) {
            for (var o4 = e5.split("."), n3 = 0; n3 < o4.length - 1; n3++)
              if (typeof (t6 = t6[o4[n3]]) != "object" || !t6)
                return;
            var i2 = o4.pop();
            return typeof t6[i2] == "function" ? function() {
              return t6[i2].apply(t6, arguments);
            } : t6[i2];
          }(this, e4);
        }, pt.set = function(t6) {
          !function(t7, e5, o4) {
            for (var n3, i2 = e5.split("."), r2 = 0; r2 < i2.length - 1; r2++)
              t7[n3 = i2[r2]] || (t7[n3] = {}), t7 = t7[n3];
            t7[i2.pop()] = o4;
          }(this, e4, t6);
        }, Object.defineProperty(t5, o3, pt);
      }(e3, n2, o2);
    });
  }, e2.prototype.refresh = function() {
    var t3 = this.setContent(this.wrapper), e3 = t3.contentChanged;
    if (t3.valid) {
      var o2 = this.content;
      this.refreshWithoutReset(o2), e3 && (this.hooks.trigger(this.hooks.eventTypes.contentChanged, o2), this.trigger(this.eventTypes.contentChanged, o2)), this.scroller.resetPosition();
    }
  }, e2.prototype.enable = function() {
    this.scroller.enable(), this.hooks.trigger(this.hooks.eventTypes.enable), this.trigger(this.eventTypes.enable);
  }, e2.prototype.disable = function() {
    this.scroller.disable(), this.hooks.trigger(this.hooks.eventTypes.disable), this.trigger(this.eventTypes.disable);
  }, e2.prototype.destroy = function() {
    this.hooks.trigger(this.hooks.eventTypes.destroy), this.trigger(this.eventTypes.destroy), this.scroller.destroy();
  }, e2.prototype.eventRegister = function(t3) {
    this.registerType(t3);
  }, e2.plugins = [], e2.pluginsMap = {}, e2;
}(dt);
function zt(t2, e2) {
  return new Ht(t2, e2);
}
zt.use = Ht.use, zt.plugins = Ht.plugins, zt.pluginsMap = Ht.pluginsMap;
var Xt = zt, _t = typeof window != "undefined", At = _t && navigator.userAgent.toLowerCase();
/*!
 * better-scroll / pull-down
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
At && /wechatdevtools/.test(At), At && At.indexOf("android"), function() {
  if (typeof At == "string") {
    var t2 = /os (\d\d?_\d(_\d)?)/.exec(At);
    if (!t2)
      return false;
    var e2 = t2[1].split("_").map(function(t3) {
      return parseInt(t3, 10);
    });
    return !!(e2[0] === 13 && e2[1] >= 4);
  }
}();
if (_t) {
  try {
    var Nt = {};
    Object.defineProperty(Nt, "passive", { get: function() {
      true;
    } }), window.addEventListener("test-passive", function() {
    }, Nt);
  } catch (t2) {
  }
}
var Ft = _t && document.createElement("div").style, It = function() {
  if (!_t)
    return false;
  for (var t2 = 0, e2 = [{ key: "standard", value: "transform" }, { key: "webkit", value: "webkitTransform" }, { key: "Moz", value: "MozTransform" }, { key: "O", value: "OTransform" }, { key: "ms", value: "msTransform" }]; t2 < e2.length; t2++) {
    var o2 = e2[t2];
    if (Ft[o2.value] !== void 0)
      return o2.key;
  }
  return false;
}();
function Rt(t2) {
  return It === false ? t2 : It === "standard" ? t2 === "transitionEnd" ? "transitionend" : t2 : It + t2.charAt(0).toUpperCase() + t2.substr(1);
}
It && It !== "standard" && It.toLowerCase();
Rt("transform"), Rt("transition");
_t && Rt("perspective"), Rt("transitionTimingFunction"), Rt("transitionDuration"), Rt("transitionDelay"), Rt("transformOrigin"), Rt("transitionEnd"), Rt("transitionProperty");
var jt = { style: "cubic-bezier(0.165, 0.84, 0.44, 1)", fn: function(t2) {
  return 1 - --t2 * t2 * t2 * t2;
} }, Ut = [{ key: "finishPullDown", name: "finishPullDown" }, { key: "openPullDown", name: "openPullDown" }, { key: "closePullDown", name: "closePullDown" }, { key: "autoPullDownRefresh", name: "autoPullDownRefresh" }].map(function(t2) {
  return { key: t2.key, sourceKey: "plugins.pullDownRefresh." + t2.name };
}), Wt = function() {
  function t2(t3) {
    this.scroll = t3, this.pulling = 0, this.thresholdBoundary = 0, this.init();
  }
  return t2.prototype.setPulling = function(t3) {
    this.pulling = t3;
  }, t2.prototype.setThresholdBoundary = function(t3) {
    this.thresholdBoundary = t3;
  }, t2.prototype.init = function() {
    this.handleBScroll(), this.handleOptions(this.scroll.options.pullDownRefresh), this.handleHooks(), this.watch();
  }, t2.prototype.handleBScroll = function() {
    this.scroll.registerType(["pullingDown", "enterThreshold", "leaveThreshold"]), this.scroll.proxy(Ut);
  }, t2.prototype.handleOptions = function(t3) {
    t3 === void 0 && (t3 = {}), t3 = t3 === true ? {} : t3;
    this.options = function(t4, e2) {
      for (var o2 in e2)
        t4[o2] = e2[o2];
      return t4;
    }({ threshold: 90, stop: 40 }, t3), this.scroll.options.probeType = 3;
  }, t2.prototype.handleHooks = function() {
    var t3 = this;
    this.hooksFn = [];
    var e2 = this.scroll.scroller, o2 = e2.scrollBehaviorY;
    this.currentMinScrollY = this.cachedOriginanMinScrollY = o2.minScrollPos, this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function() {
      t3.finishPullDown();
    }), this.registerHooks(o2.hooks, o2.hooks.eventTypes.computeBoundary, function(e3) {
      e3.maxScrollPos > 0 && (e3.maxScrollPos = -1), e3.minScrollPos = t3.currentMinScrollY;
    }), this.hasMouseWheelPlugin() && (this.registerHooks(this.scroll, this.scroll.eventTypes.alterOptions, function(t4) {
      t4.discreteTime = 300, t4.easeTime = 350;
    }), this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function() {
      e2.hooks.trigger(e2.hooks.eventTypes.end);
    }));
  }, t2.prototype.registerHooks = function(t3, e2, o2) {
    t3.on(e2, o2, this), this.hooksFn.push([t3, e2, o2]);
  }, t2.prototype.hasMouseWheelPlugin = function() {
    return !!this.scroll.eventTypes.alterOptions;
  }, t2.prototype.watch = function() {
    var t3 = this.scroll.scroller;
    this.watching = true, this.registerHooks(t3.hooks, t3.hooks.eventTypes.end, this.checkPullDown), this.registerHooks(this.scroll, this.scroll.eventTypes.scrollStart, this.resetStateBeforeScrollStart), this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkLocationOfThresholdBoundary), this.hasMouseWheelPlugin() && this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
  }, t2.prototype.resetStateBeforeScrollStart = function() {
    this.isFetchingStatus() || (this.setPulling(1), this.setThresholdBoundary(0));
  }, t2.prototype.checkLocationOfThresholdBoundary = function() {
    if (this.pulling === 1) {
      var t3 = this.scroll, e2 = this.thresholdBoundary !== 1 && this.locateInsideThresholdBoundary(), o2 = this.thresholdBoundary !== 2 && !this.locateInsideThresholdBoundary();
      e2 && (this.setThresholdBoundary(1), t3.trigger("enterThreshold")), o2 && (this.setThresholdBoundary(2), t3.trigger("leaveThreshold"));
    }
  }, t2.prototype.locateInsideThresholdBoundary = function() {
    return this.scroll.y <= this.options.threshold;
  }, t2.prototype.unwatch = function() {
    var t3 = this.scroll, e2 = t3.scroller;
    this.watching = false, e2.hooks.off(e2.hooks.eventTypes.end, this.checkPullDown), t3.off(t3.eventTypes.scrollStart, this.resetStateBeforeScrollStart), t3.off(t3.eventTypes.scroll, this.checkLocationOfThresholdBoundary), this.hasMouseWheelPlugin() && t3.off(t3.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
  }, t2.prototype.checkPullDown = function() {
    var t3 = this.options, e2 = t3.threshold, o2 = t3.stop;
    return !(this.scroll.y < e2) && (this.pulling === 1 && (this.modifyBehaviorYBoundary(o2), this.setPulling(2), this.scroll.trigger("pullingDown")), this.scroll.scrollTo(this.scroll.x, o2, this.scroll.options.bounceTime, jt), this.isFetchingStatus());
  }, t2.prototype.isFetchingStatus = function() {
    return this.pulling === 2;
  }, t2.prototype.modifyBehaviorYBoundary = function(t3) {
    var e2 = this.scroll.scroller.scrollBehaviorY;
    this.cachedOriginanMinScrollY = e2.minScrollPos, this.currentMinScrollY = t3, e2.computeBoundary();
  }, t2.prototype.finishPullDown = function() {
    if (this.isFetchingStatus()) {
      var t3 = this.scroll.scroller.scrollBehaviorY;
      this.currentMinScrollY = this.cachedOriginanMinScrollY, t3.computeBoundary(), this.setPulling(0), this.scroll.resetPosition(this.scroll.options.bounceTime, jt);
    }
  }, t2.prototype.openPullDown = function(t3) {
    t3 === void 0 && (t3 = {}), this.handleOptions(t3), this.watching || this.watch();
  }, t2.prototype.closePullDown = function() {
    this.unwatch();
  }, t2.prototype.autoPullDownRefresh = function() {
    var t3 = this.options, e2 = t3.threshold, o2 = t3.stop;
    !this.isFetchingStatus() && this.watching && (this.modifyBehaviorYBoundary(o2), this.scroll.trigger(this.scroll.eventTypes.scrollStart), this.scroll.scrollTo(this.scroll.x, e2), this.setPulling(2), this.scroll.trigger("pullingDown"), this.scroll.scrollTo(this.scroll.x, o2, this.scroll.options.bounceTime, jt));
  }, t2.pluginName = "pullDownRefresh", t2;
}(), Kt = typeof window != "undefined", Vt = Kt && navigator.userAgent.toLowerCase();
Vt && /wechatdevtools/.test(Vt), Vt && Vt.indexOf("android"), function() {
  if (typeof Vt == "string") {
    var t2 = /os (\d\d?_\d(_\d)?)/.exec(Vt);
    if (!t2)
      return false;
    var e2 = t2[1].split("_").map(function(t3) {
      return parseInt(t3, 10);
    });
    return !!(e2[0] === 13 && e2[1] >= 4);
  }
}();
if (Kt) {
  try {
    var qt = {};
    Object.defineProperty(qt, "passive", { get: function() {
      true;
    } }), window.addEventListener("test-passive", function() {
    }, qt);
  } catch (t2) {
  }
}
var $t = Kt && document.createElement("div").style, Gt = function() {
  if (!Kt)
    return false;
  for (var t2 = 0, e2 = [{ key: "standard", value: "transform" }, { key: "webkit", value: "webkitTransform" }, { key: "Moz", value: "MozTransform" }, { key: "O", value: "OTransform" }, { key: "ms", value: "msTransform" }]; t2 < e2.length; t2++) {
    var o2 = e2[t2];
    if ($t[o2.value] !== void 0)
      return o2.key;
  }
  return false;
}();
function Zt(t2) {
  return Gt === false ? t2 : Gt === "standard" ? t2 === "transitionEnd" ? "transitionend" : t2 : Gt + t2.charAt(0).toUpperCase() + t2.substr(1);
}
Gt && Gt !== "standard" && Gt.toLowerCase();
Zt("transform"), Zt("transition");
Kt && Zt("perspective"), Zt("transitionTimingFunction"), Zt("transitionDuration"), Zt("transitionDelay"), Zt("transformOrigin"), Zt("transitionEnd"), Zt("transitionProperty");
var Jt = [{ key: "finishPullUp", name: "finishPullUp" }, { key: "openPullUp", name: "openPullUp" }, { key: "closePullUp", name: "closePullUp" }, { key: "autoPullUpLoad", name: "autoPullUpLoad" }].map(function(t2) {
  return { key: t2.key, sourceKey: "plugins.pullUpLoad." + t2.name };
}), Qt = function() {
  function t2(t3) {
    this.scroll = t3, this.pulling = false, this.watching = false, this.init();
  }
  return t2.prototype.init = function() {
    this.handleBScroll(), this.handleOptions(this.scroll.options.pullUpLoad), this.handleHooks(), this.watch();
  }, t2.prototype.handleBScroll = function() {
    this.scroll.registerType(["pullingUp"]), this.scroll.proxy(Jt);
  }, t2.prototype.handleOptions = function(t3) {
    t3 === void 0 && (t3 = {}), t3 = t3 === true ? {} : t3;
    this.options = function(t4, e2) {
      for (var o2 in e2)
        t4[o2] = e2[o2];
      return t4;
    }({ threshold: 0 }, t3), this.scroll.options.probeType = 3;
  }, t2.prototype.handleHooks = function() {
    var t3 = this;
    this.hooksFn = [];
    var e2 = this.scroll.scroller.scrollBehaviorY;
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function() {
      t3.finishPullUp();
    }), this.registerHooks(e2.hooks, e2.hooks.eventTypes.computeBoundary, function(t4) {
      t4.maxScrollPos > 0 && (t4.maxScrollPos = -1);
    });
  }, t2.prototype.registerHooks = function(t3, e2, o2) {
    t3.on(e2, o2, this), this.hooksFn.push([t3, e2, o2]);
  }, t2.prototype.watch = function() {
    this.watching || (this.watching = true, this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkPullUp));
  }, t2.prototype.unwatch = function() {
    this.watching = false, this.scroll.off(this.scroll.eventTypes.scroll, this.checkPullUp);
  }, t2.prototype.checkPullUp = function(t3) {
    var e2 = this, o2 = this.options.threshold;
    this.scroll.movingDirectionY === 1 && t3.y <= this.scroll.maxScrollY + o2 && (this.pulling = true, this.scroll.once(this.scroll.eventTypes.scrollEnd, function() {
      e2.pulling = false;
    }), this.unwatch(), this.scroll.trigger("pullingUp"));
  }, t2.prototype.finishPullUp = function() {
    var t3 = this;
    this.scroll.scroller.scrollBehaviorY.setMovingDirection(0), this.pulling ? this.scroll.once(this.scroll.eventTypes.scrollEnd, function() {
      t3.watch();
    }) : this.watch();
  }, t2.prototype.openPullUp = function(t3) {
    t3 === void 0 && (t3 = {}), this.handleOptions(t3), this.watch();
  }, t2.prototype.closePullUp = function() {
    this.unwatch();
  }, t2.prototype.autoPullUpLoad = function() {
    var t3 = this.options.threshold, e2 = this.scroll.scroller.scrollBehaviorY;
    if (!this.pulling && this.watching) {
      var o2 = e2.maxScrollPos + t3 + -1;
      this.scroll.scroller.scrollBehaviorY.setMovingDirection(-1), this.scroll.scrollTo(this.scroll.x, o2, this.scroll.options.bounceTime);
    }
  }, t2.pluginName = "pullUpLoad", t2;
}();
var te = typeof window != "undefined", ee = te && navigator.userAgent.toLowerCase();
ee && /wechatdevtools/.test(ee), ee && ee.indexOf("android"), function() {
  if (typeof ee == "string") {
    var t2 = /os (\d\d?_\d(_\d)?)/.exec(ee);
    if (!t2)
      return false;
    var e2 = t2[1].split("_").map(function(t3) {
      return parseInt(t3, 10);
    });
    return !!(e2[0] === 13 && e2[1] >= 4);
  }
}();
var oe = false;
if (te) {
  try {
    var ne = {};
    Object.defineProperty(ne, "passive", { get: function() {
      oe = true;
    } }), window.addEventListener("test-passive", function() {
    }, ne);
  } catch (t2) {
  }
}
var ie = te && document.createElement("div").style, re = function() {
  if (!te)
    return false;
  for (var t2 = 0, e2 = [{ key: "standard", value: "transform" }, { key: "webkit", value: "webkitTransform" }, { key: "Moz", value: "MozTransform" }, { key: "O", value: "OTransform" }, { key: "ms", value: "msTransform" }]; t2 < e2.length; t2++) {
    var o2 = e2[t2];
    if (ie[o2.value] !== void 0)
      return o2.key;
  }
  return false;
}();
function se(t2) {
  return re === false ? t2 : re === "standard" ? t2 === "transitionEnd" ? "transitionend" : t2 : re + t2.charAt(0).toUpperCase() + t2.substr(1);
}
function ae(t2, e2, o2, n2) {
  var i2 = oe ? { passive: false, capture: !!n2 } : !!n2;
  t2.addEventListener(e2, o2, i2);
}
function le(t2, e2, o2, n2) {
  t2.removeEventListener(e2, o2, { capture: !!n2 });
}
re && re !== "standard" && re.toLowerCase();
se("transform"), se("transition");
te && se("perspective"), se("transitionTimingFunction"), se("transitionDuration"), se("transitionDelay"), se("transformOrigin"), se("transitionEnd"), se("transitionProperty");
var he = function() {
  function t2(t3, e2) {
    this.wrapper = t3, this.events = e2, this.addDOMEvents();
  }
  return t2.prototype.destroy = function() {
    this.removeDOMEvents(), this.events = [];
  }, t2.prototype.addDOMEvents = function() {
    this.handleDOMEvents(ae);
  }, t2.prototype.removeDOMEvents = function() {
    this.handleDOMEvents(le);
  }, t2.prototype.handleDOMEvents = function(t3) {
    var e2 = this, o2 = this.wrapper;
    this.events.forEach(function(n2) {
      t3(o2, n2.name, e2, !!n2.capture);
    });
  }, t2.prototype.handleEvent = function(t3) {
    var e2 = t3.type;
    this.events.some(function(o2) {
      return o2.name === e2 && (o2.handler(t3), true);
    });
  }, t2;
}(), ce = function() {
  function t2(t3) {
    this.scroll = t3, this.wheelEndTimer = 0, this.wheelMoveTimer = 0, this.wheelStart = false, this.init();
  }
  return t2.prototype.init = function() {
    this.handleBScroll(), this.handleOptions(), this.handleHooks(), this.registerEvent();
  }, t2.prototype.handleBScroll = function() {
    this.scroll.registerType(["alterOptions", "mousewheelStart", "mousewheelMove", "mousewheelEnd"]);
  }, t2.prototype.handleOptions = function() {
    var t3 = this.scroll.options.mouseWheel === true ? {} : this.scroll.options.mouseWheel;
    this.mouseWheelOpt = function(t4, e2) {
      for (var o2 in e2)
        t4[o2] = e2[o2];
      return t4;
    }({ speed: 20, invert: false, easeTime: 300, discreteTime: 400, throttleTime: 0, dampingFactor: 0.1 }, t3);
  }, t2.prototype.handleHooks = function() {
    this.hooksFn = [], this.registerHooks(this.scroll.hooks, "destroy", this.destroy);
  }, t2.prototype.registerEvent = function() {
    this.eventRegister = new he(this.scroll.scroller.wrapper, [{ name: "wheel", handler: this.wheelHandler.bind(this) }, { name: "mousewheel", handler: this.wheelHandler.bind(this) }, { name: "DOMMouseScroll", handler: this.wheelHandler.bind(this) }]);
  }, t2.prototype.registerHooks = function(t3, e2, o2) {
    t3.on(e2, o2, this), this.hooksFn.push([t3, e2, o2]);
  }, t2.prototype.wheelHandler = function(t3) {
    if (this.scroll.enabled) {
      this.beforeHandler(t3), this.wheelStart || (this.wheelStartHandler(t3), this.wheelStart = true);
      var e2 = this.getWheelDelta(t3);
      this.wheelMoveHandler(e2), this.wheelEndDetector(e2);
    }
  }, t2.prototype.wheelStartHandler = function(t3) {
    this.cleanCache();
    var e2 = this.scroll.scroller, o2 = e2.scrollBehaviorX, n2 = e2.scrollBehaviorY;
    o2.setMovingDirection(0), n2.setMovingDirection(0), o2.setDirection(0), n2.setDirection(0), this.scroll.trigger(this.scroll.eventTypes.alterOptions, this.mouseWheelOpt), this.scroll.trigger(this.scroll.eventTypes.mousewheelStart);
  }, t2.prototype.cleanCache = function() {
    this.deltaCache = [];
  }, t2.prototype.wheelMoveHandler = function(t3) {
    var e2 = this, o2 = this.mouseWheelOpt, n2 = o2.throttleTime, i2 = o2.dampingFactor;
    if (n2 && this.wheelMoveTimer)
      this.deltaCache.push(t3);
    else {
      var r2 = this.deltaCache.reduce(function(t4, e3) {
        return { x: t4.x + e3.x, y: t4.y + e3.y };
      }, { x: 0, y: 0 });
      this.cleanCache();
      var s2 = this.scroll.scroller, a2 = s2.scrollBehaviorX, l2 = s2.scrollBehaviorY;
      a2.setMovingDirection(-t3.directionX), l2.setMovingDirection(-t3.directionY), a2.setDirection(t3.x), l2.setDirection(t3.y);
      var h2 = a2.performDampingAlgorithm(Math.round(t3.x) + r2.x, i2), c2 = l2.performDampingAlgorithm(Math.round(t3.y) + r2.x, i2);
      if (!this.scroll.trigger(this.scroll.eventTypes.mousewheelMove, { x: h2, y: c2 })) {
        var u2 = this.getEaseTime();
        h2 === this.scroll.x && c2 === this.scroll.y || this.scroll.scrollTo(h2, c2, u2);
      }
      n2 && (this.wheelMoveTimer = window.setTimeout(function() {
        e2.wheelMoveTimer = 0;
      }, n2));
    }
  }, t2.prototype.wheelEndDetector = function(t3) {
    var e2 = this;
    window.clearTimeout(this.wheelEndTimer), this.wheelEndTimer = window.setTimeout(function() {
      e2.wheelStart = false, window.clearTimeout(e2.wheelMoveTimer), e2.wheelMoveTimer = 0, e2.scroll.trigger(e2.scroll.eventTypes.mousewheelEnd, t3);
    }, this.mouseWheelOpt.discreteTime);
  }, t2.prototype.getWheelDelta = function(t3) {
    var e2 = this.mouseWheelOpt, o2 = e2.speed, n2 = 0, i2 = 0, r2 = e2.invert ? -1 : 1;
    switch (true) {
      case "deltaX" in t3:
        t3.deltaMode === 1 ? (n2 = -t3.deltaX * o2, i2 = -t3.deltaY * o2) : (n2 = -t3.deltaX, i2 = -t3.deltaY);
        break;
      case "wheelDeltaX" in t3:
        n2 = t3.wheelDeltaX / 120 * o2, i2 = t3.wheelDeltaY / 120 * o2;
        break;
      case "wheelDelta" in t3:
        n2 = i2 = t3.wheelDelta / 120 * o2;
        break;
      case "detail" in t3:
        n2 = i2 = -t3.detail / 3 * o2;
    }
    return n2 *= r2, i2 *= r2, this.scroll.hasVerticalScroll || (Math.abs(i2) > Math.abs(n2) && (n2 = i2), i2 = 0), this.scroll.hasHorizontalScroll || (n2 = 0), { x: n2, y: i2, directionX: n2 > 0 ? -1 : n2 < 0 ? 1 : 0, directionY: i2 > 0 ? -1 : i2 < 0 ? 1 : 0 };
  }, t2.prototype.beforeHandler = function(t3) {
    var e2 = this.scroll.options, o2 = e2.preventDefault, n2 = e2.stopPropagation, i2 = e2.preventDefaultException;
    o2 && !function(t4, e3) {
      for (var o3 in e3)
        if (e3[o3].test(t4[o3]))
          return true;
      return false;
    }(t3.target, i2) && t3.preventDefault(), n2 && t3.stopPropagation();
  }, t2.prototype.getEaseTime = function() {
    var t3, e2 = this.mouseWheelOpt.easeTime;
    return e2 < 100 && (t3 = "easeTime should be greater than 100.If mouseWheel easeTime is too small,scrollEnd will be triggered many times.", console.error("[BScroll warn]: " + t3)), Math.max(e2, 100);
  }, t2.prototype.destroy = function() {
    this.eventRegister.destroy(), window.clearTimeout(this.wheelEndTimer), window.clearTimeout(this.wheelMoveTimer), this.hooksFn.forEach(function(t3) {
      var e2 = t3[0], o2 = t3[1], n2 = t3[2];
      e2.off(o2, n2);
    });
  }, t2.pluginName = "mouseWheel", t2.applyOrder = "pre", t2;
}(), ue = function() {
  return (ue = Object.assign || function(t2) {
    for (var e2, o2 = 1, n2 = arguments.length; o2 < n2; o2++)
      for (var i2 in e2 = arguments[o2])
        Object.prototype.hasOwnProperty.call(e2, i2) && (t2[i2] = e2[i2]);
    return t2;
  }).apply(this, arguments);
};
function pe() {
  for (var t2 = 0, e2 = 0, o2 = arguments.length; e2 < o2; e2++)
    t2 += arguments[e2].length;
  var n2 = Array(t2), i2 = 0;
  for (e2 = 0; e2 < o2; e2++)
    for (var r2 = arguments[e2], s2 = 0, a2 = r2.length; s2 < a2; s2++, i2++)
      n2[i2] = r2[s2];
  return n2;
}
var de = typeof window != "undefined", fe = de && navigator.userAgent.toLowerCase();
fe && /wechatdevtools/.test(fe), fe && fe.indexOf("android"), function() {
  if (typeof fe == "string") {
    var t2 = /os (\d\d?_\d(_\d)?)/.exec(fe);
    if (!t2)
      return false;
    var e2 = t2[1].split("_").map(function(t3) {
      return parseInt(t3, 10);
    });
    return !!(e2[0] === 13 && e2[1] >= 4);
  }
}();
var ye = false;
if (de) {
  try {
    var me = {};
    Object.defineProperty(me, "passive", { get: function() {
      ye = true;
    } }), window.addEventListener("test-passive", function() {
    }, me);
  } catch (t2) {
  }
}
function ve() {
  return window.performance && window.performance.now && window.performance.timing ? window.performance.now() + window.performance.timing.navigationStart : +new Date();
}
function ge(t2, e2, o2) {
  return t2 < e2 ? e2 : t2 > o2 ? o2 : t2;
}
var ke = de && document.createElement("div").style, we = function() {
  if (!de)
    return false;
  for (var t2 = 0, e2 = [{ key: "standard", value: "transform" }, { key: "webkit", value: "webkitTransform" }, { key: "Moz", value: "MozTransform" }, { key: "O", value: "OTransform" }, { key: "ms", value: "msTransform" }]; t2 < e2.length; t2++) {
    var o2 = e2[t2];
    if (ke[o2.value] !== void 0)
      return o2.key;
  }
  return false;
}();
function Te(t2) {
  return we === false ? t2 : we === "standard" ? t2 === "transitionEnd" ? "transitionend" : t2 : we + t2.charAt(0).toUpperCase() + t2.substr(1);
}
function be(t2, e2, o2, n2) {
  var i2 = ye ? { passive: false, capture: !!n2 } : !!n2;
  t2.addEventListener(e2, o2, i2);
}
function Se(t2, e2, o2, n2) {
  t2.removeEventListener(e2, o2, { capture: !!n2 });
}
we && we !== "standard" && we.toLowerCase();
var Pe = Te("transform");
Te("transition");
de && Te("perspective");
var xe = Pe, Ee = Te("transitionTimingFunction"), De = Te("transitionDuration"), Me = (Te("transitionDelay"), Te("transformOrigin"), Te("transitionEnd"), Te("transitionProperty"), function() {
  function t2(t3) {
    this.events = {}, this.eventTypes = {}, this.registerType(t3);
  }
  return t2.prototype.on = function(t3, e2, o2) {
    return o2 === void 0 && (o2 = this), this.hasType(t3), this.events[t3] || (this.events[t3] = []), this.events[t3].push([e2, o2]), this;
  }, t2.prototype.once = function(t3, e2, o2) {
    var n2 = this;
    o2 === void 0 && (o2 = this), this.hasType(t3);
    var i2 = function() {
      for (var r2 = [], s2 = 0; s2 < arguments.length; s2++)
        r2[s2] = arguments[s2];
      n2.off(t3, i2);
      var a2 = e2.apply(o2, r2);
      if (a2 === true)
        return a2;
    };
    return i2.fn = e2, this.on(t3, i2), this;
  }, t2.prototype.off = function(t3, e2) {
    if (!t3 && !e2)
      return this.events = {}, this;
    if (t3) {
      if (this.hasType(t3), !e2)
        return this.events[t3] = [], this;
      var o2 = this.events[t3];
      if (!o2)
        return this;
      for (var n2 = o2.length; n2--; )
        (o2[n2][0] === e2 || o2[n2][0] && o2[n2][0].fn === e2) && o2.splice(n2, 1);
      return this;
    }
  }, t2.prototype.trigger = function(t3) {
    for (var e2 = [], o2 = 1; o2 < arguments.length; o2++)
      e2[o2 - 1] = arguments[o2];
    this.hasType(t3);
    var n2 = this.events[t3];
    if (n2)
      for (var i2, r2 = n2.length, s2 = pe(n2), a2 = 0; a2 < r2; a2++) {
        var l2 = s2[a2], h2 = l2[0], c2 = l2[1];
        if (h2 && (i2 = h2.apply(c2, e2)) === true)
          return i2;
      }
  }, t2.prototype.registerType = function(t3) {
    var e2 = this;
    t3.forEach(function(t4) {
      e2.eventTypes[t4] = t4;
    });
  }, t2.prototype.destroy = function() {
    this.events = {}, this.eventTypes = {};
  }, t2.prototype.hasType = function(t3) {
    var e2, o2 = this.eventTypes;
    o2[t3] === t3 || (e2 = 'EventEmitter has used unknown event type: "' + t3 + '", should be oneof [' + Object.keys(o2).map(function(t4) {
      return JSON.stringify(t4);
    }) + "]", console.error("[BScroll warn]: " + e2));
  }, t2;
}()), Ce = function() {
  function t2(t3, e2) {
    this.wrapper = t3, this.events = e2, this.addDOMEvents();
  }
  return t2.prototype.destroy = function() {
    this.removeDOMEvents(), this.events = [];
  }, t2.prototype.addDOMEvents = function() {
    this.handleDOMEvents(be);
  }, t2.prototype.removeDOMEvents = function() {
    this.handleDOMEvents(Se);
  }, t2.prototype.handleDOMEvents = function(t3) {
    var e2 = this, o2 = this.wrapper;
    this.events.forEach(function(n2) {
      t3(o2, n2.name, e2, !!n2.capture);
    });
  }, t2.prototype.handleEvent = function(t3) {
    var e2 = t3.type;
    this.events.some(function(o2) {
      return o2.name === e2 && (o2.handler(t3), true);
    });
  }, t2;
}(), Be = function() {
  function t2(t3, e2) {
    this.indicator = t3, this.options = e2, this.hooks = new Me(["touchStart", "touchMove", "touchEnd"]), this.registerEvents();
  }
  return t2.prototype.registerEvents = function() {
    var t3 = this.options, e2 = t3.disableMouse, o2 = t3.disableTouch, n2 = [], i2 = [], r2 = [];
    e2 || (n2.push({ name: "mousedown", handler: this.start.bind(this) }), i2.push({ name: "mousemove", handler: this.move.bind(this) }), r2.push({ name: "mouseup", handler: this.end.bind(this) })), o2 || (n2.push({ name: "touchstart", handler: this.start.bind(this) }), i2.push({ name: "touchmove", handler: this.move.bind(this) }), r2.push({ name: "touchend", handler: this.end.bind(this) }, { name: "touchcancel", handler: this.end.bind(this) })), this.startEventRegister = new Ce(this.indicator.indicatorEl, n2), this.moveEventRegister = new Ce(window, i2), this.endEventRegister = new Ce(window, r2);
  }, t2.prototype.BScrollIsDisabled = function() {
    return !this.indicator.scroll.enabled;
  }, t2.prototype.start = function(t3) {
    if (!this.BScrollIsDisabled()) {
      var e2 = t3.touches ? t3.touches[0] : t3;
      t3.preventDefault(), t3.stopPropagation(), this.initiated = true, this.lastPoint = e2[this.indicator.keysMap.point], this.hooks.trigger(this.hooks.eventTypes.touchStart);
    }
  }, t2.prototype.move = function(t3) {
    if (this.initiated) {
      var e2 = (t3.touches ? t3.touches[0] : t3)[this.indicator.keysMap.point];
      t3.preventDefault(), t3.stopPropagation();
      var o2 = e2 - this.lastPoint;
      this.lastPoint = e2, this.hooks.trigger(this.hooks.eventTypes.touchMove, o2);
    }
  }, t2.prototype.end = function(t3) {
    this.initiated && (this.initiated = false, t3.preventDefault(), t3.stopPropagation(), this.hooks.trigger(this.hooks.eventTypes.touchEnd));
  }, t2.prototype.destroy = function() {
    this.startEventRegister.destroy(), this.moveEventRegister.destroy(), this.endEventRegister.destroy();
  }, t2;
}(), Oe = function() {
  function t2(t3, e2) {
    this.scroll = t3, this.options = e2, this.hooksFn = [], this.wrapper = e2.wrapper, this.direction = e2.direction, this.indicatorEl = this.wrapper.children[0], this.keysMap = this.getKeysMap(), this.handleFade(), this.handleHooks();
  }
  return t2.prototype.handleFade = function() {
    this.options.fade && (this.wrapper.style.opacity = "0");
  }, t2.prototype.handleHooks = function() {
    var t3 = this, e2 = this.options, o2 = e2.fade, n2 = e2.interactive, i2 = e2.scrollbarTrackClickable, r2 = this.scroll, s2 = r2.hooks, a2 = r2.scroller.translater.hooks, l2 = r2.scroller.animater.hooks;
    if (this.registerHooks(s2, s2.eventTypes.refresh, this.refresh), this.registerHooks(a2, a2.eventTypes.translate, function(e3) {
      var o3 = t3.keysMap.hasScroll;
      t3.scroll[o3] && t3.updatePosition(e3);
    }), this.registerHooks(l2, l2.eventTypes.time, this.transitionTime), this.registerHooks(l2, l2.eventTypes.timeFunction, this.transitionTimingFunction), o2 && (this.registerHooks(r2, r2.eventTypes.scrollEnd, function() {
      t3.fade();
    }), this.registerHooks(r2, r2.eventTypes.scrollStart, function() {
      t3.fade(true);
    }), r2.eventTypes.mousewheelStart && r2.eventTypes.mousewheelEnd && (this.registerHooks(r2, r2.eventTypes.mousewheelStart, function() {
      t3.fade(true);
    }), this.registerHooks(r2, r2.eventTypes.mousewheelMove, function() {
      t3.fade(true);
    }), this.registerHooks(r2, r2.eventTypes.mousewheelEnd, function() {
      t3.fade();
    }))), n2) {
      var h2 = this.scroll.options, c2 = h2.disableMouse, u2 = h2.disableTouch;
      this.eventHandler = new Be(this, { disableMouse: c2, disableTouch: u2 });
      var p2 = this.eventHandler.hooks;
      this.registerHooks(p2, p2.eventTypes.touchStart, this.startHandler), this.registerHooks(p2, p2.eventTypes.touchMove, this.moveHandler), this.registerHooks(p2, p2.eventTypes.touchEnd, this.endHandler);
    }
    i2 && this.bindClick();
  }, t2.prototype.registerHooks = function(t3, e2, o2) {
    t3.on(e2, o2, this), this.hooksFn.push([t3, e2, o2]);
  }, t2.prototype.bindClick = function() {
    var t3 = this.wrapper;
    this.clickEventRegister = new Ce(t3, [{ name: "click", handler: this.handleClick.bind(this) }]);
  }, t2.prototype.handleClick = function(t3) {
    var e2 = this.calculateclickOffsetPos(t3), o2 = this.scroll, n2 = o2.x, i2 = o2.y;
    n2 = this.direction === "horizontal" ? e2 : n2, i2 = this.direction === "vertical" ? e2 : i2, this.scroll.scrollTo(n2, i2, this.options.scrollbarTrackOffsetTime);
  }, t2.prototype.calculateclickOffsetPos = function(t3) {
    var e2 = this.keysMap, o2 = e2.point, n2 = e2.domRect, i2 = this.options.scrollbarTrackOffsetType, r2 = t3[o2] - this.wrapperRect[n2], s2 = r2 < this.currentPos ? -1 : 1, a2 = 0, l2 = this.currentPos;
    return i2 === "step" ? a2 = this.scrollInfo.baseSize * s2 : (a2 = 0, l2 = r2), this.newPos(l2, a2, this.scrollInfo);
  }, t2.prototype.getKeysMap = function() {
    return this.direction === "vertical" ? { hasScroll: "hasVerticalScroll", size: "height", wrapperSize: "clientHeight", scrollerSize: "scrollerHeight", maxScrollPos: "maxScrollY", pos: "y", point: "pageY", translateProperty: "translateY", domRect: "top" } : { hasScroll: "hasHorizontalScroll", size: "width", wrapperSize: "clientWidth", scrollerSize: "scrollerWidth", maxScrollPos: "maxScrollX", pos: "x", point: "pageX", translateProperty: "translateX", domRect: "left" };
  }, t2.prototype.fade = function(t3) {
    var e2 = this.options, o2 = e2.fadeInTime, n2 = e2.fadeOutTime, i2 = t3 ? o2 : n2, r2 = this.wrapper;
    r2.style[De] = i2 + "ms", r2.style.opacity = t3 ? "1" : "0";
  }, t2.prototype.refresh = function() {
    var t3 = this.keysMap.hasScroll, e2 = this.scroll, o2 = e2.x, n2 = e2.y;
    if (this.wrapperRect = this.wrapper.getBoundingClientRect(), this.canScroll(e2[t3])) {
      var i2 = this.keysMap, r2 = i2.wrapperSize, s2 = i2.scrollerSize, a2 = i2.maxScrollPos;
      this.scrollInfo = this.refreshScrollInfo(this.wrapper[r2], e2[s2], e2[a2], this.indicatorEl[r2]), this.updatePosition({ x: o2, y: n2 });
    }
  }, t2.prototype.transitionTime = function(t3) {
    t3 === void 0 && (t3 = 0), this.indicatorEl.style[De] = t3 + "ms";
  }, t2.prototype.transitionTimingFunction = function(t3) {
    this.indicatorEl.style[Ee] = t3;
  }, t2.prototype.canScroll = function(t3) {
    return this.wrapper.style.display = t3 ? "block" : "none", t3;
  }, t2.prototype.refreshScrollInfo = function(t3, e2, o2, n2) {
    var i2 = Math.max(Math.round(t3 * t3 / (e2 || t3 || 1)), this.options.minSize);
    this.options.isCustom && (i2 = n2);
    var r2 = t3 - i2;
    return { baseSize: i2, maxScrollPos: r2, minScrollPos: 0, sizeRatio: r2 / o2 };
  }, t2.prototype.updatePosition = function(t3) {
    var e2 = this.caculatePosAndSize(t3, this.scrollInfo), o2 = e2.pos, n2 = e2.size;
    this.refreshStyle(n2, o2), this.currentPos = o2;
  }, t2.prototype.caculatePosAndSize = function(t3, e2) {
    var o2, n2 = this.keysMap.pos, i2 = e2.sizeRatio, r2 = e2.baseSize, s2 = e2.maxScrollPos, a2 = e2.minScrollPos, l2 = this.options.minSize, h2 = Math.round(i2 * t3[n2]);
    return h2 < a2 ? (o2 = Math.max(r2 + 3 * h2, l2), h2 = a2) : h2 > s2 ? h2 = s2 + r2 - (o2 = Math.max(r2 - 3 * (h2 - s2), l2)) : o2 = r2, { pos: h2, size: o2 };
  }, t2.prototype.refreshStyle = function(t3, e2) {
    var o2 = this.keysMap, n2 = o2.translateProperty, i2 = o2.size, r2 = this.scroll.options.translateZ;
    this.indicatorEl.style[i2] = t3 + "px", this.indicatorEl.style[xe] = n2 + "(" + e2 + "px)" + r2;
  }, t2.prototype.startHandler = function() {
    this.moved = false, this.startTime = ve(), this.transitionTime(), this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.beforeScrollStart);
  }, t2.prototype.moveHandler = function(t3) {
    if (this.moved || this.indicatorNotMoved(t3) || (this.moved = true, this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollStart)), this.moved) {
      var e2 = this.newPos(this.currentPos, t3, this.scrollInfo);
      this.syncBScroll(e2);
    }
  }, t2.prototype.endHandler = function() {
    if (this.moved) {
      var t3 = this.scroll, e2 = t3.x, o2 = t3.y;
      this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollEnd, { x: e2, y: o2 });
    }
  }, t2.prototype.indicatorNotMoved = function(t3) {
    var e2 = this.currentPos, o2 = this.scrollInfo, n2 = o2.maxScrollPos;
    return e2 === o2.minScrollPos && t3 <= 0 || e2 === n2 && t3 >= 0;
  }, t2.prototype.syncBScroll = function(t3) {
    var e2 = ve(), o2 = this.scroll, n2 = o2.x, i2 = o2.y, r2 = o2.options, s2 = o2.scroller, a2 = o2.maxScrollY, l2 = o2.minScrollY, h2 = o2.maxScrollX, c2 = o2.minScrollX, u2 = r2.probeType, p2 = r2.momentumLimitTime, d2 = { x: n2, y: i2 };
    this.direction === "vertical" ? d2.y = ge(t3, a2, l2) : d2.x = ge(t3, h2, c2), s2.translater.translate(d2), e2 - this.startTime > p2 && (this.startTime = e2, u2 === 1 && s2.hooks.trigger(s2.hooks.eventTypes.scroll, d2)), u2 > 1 && s2.hooks.trigger(s2.hooks.eventTypes.scroll, d2);
  }, t2.prototype.newPos = function(t3, e2, o2) {
    var n2 = o2.maxScrollPos, i2 = o2.sizeRatio, r2 = t3 + e2;
    return r2 = ge(r2, o2.minScrollPos, n2), Math.round(r2 / i2);
  }, t2.prototype.destroy = function() {
    var t3 = this.options, e2 = t3.interactive, o2 = t3.scrollbarTrackClickable, n2 = t3.isCustom;
    e2 && this.eventHandler.destroy(), o2 && this.clickEventRegister.destroy(), n2 || this.wrapper.parentNode.removeChild(this.wrapper), this.hooksFn.forEach(function(t4) {
      var e3 = t4[0], o3 = t4[1], n3 = t4[2];
      e3.off(o3, n3);
    }), this.hooksFn.length = 0;
  }, t2;
}(), Le = function() {
  function t2(t3) {
    this.scroll = t3, this.handleOptions(), this.createIndicators(), this.handleHooks();
  }
  return t2.prototype.handleHooks = function() {
    var t3 = this, e2 = this.scroll;
    e2.hooks.on(e2.hooks.eventTypes.destroy, function() {
      for (var e3 = 0, o2 = t3.indicators; e3 < o2.length; e3++) {
        o2[e3].destroy();
      }
    });
  }, t2.prototype.handleOptions = function() {
    var t3 = this.scroll.options.scrollbar === true ? {} : this.scroll.options.scrollbar;
    this.options = function(t4, e2) {
      for (var o2 in e2)
        t4[o2] = e2[o2];
      return t4;
    }({ fade: true, fadeInTime: 250, fadeOutTime: 500, interactive: false, customElements: [], minSize: 8, scrollbarTrackClickable: false, scrollbarTrackOffsetType: "step", scrollbarTrackOffsetTime: 300 }, t3);
  }, t2.prototype.createIndicators = function() {
    for (var t3, e2 = this.scroll, o2 = [], n2 = ["scrollX", "scrollY"], i2 = ["horizontal", "vertical"], r2 = this.options.customElements, s2 = 0; s2 < n2.length; s2++) {
      var a2 = n2[s2];
      if (e2.options[a2]) {
        var l2 = r2.shift(), h2 = i2[s2], c2 = false, u2 = l2 || this.createScrollbarElement(h2);
        u2 !== l2 ? e2.wrapper.appendChild(u2) : c2 = true, t3 = ue(ue({ wrapper: u2, direction: h2 }, this.options), { isCustom: c2 }), o2.push(new Oe(e2, t3));
      }
    }
    this.indicators = o2;
  }, t2.prototype.createScrollbarElement = function(t3, e2) {
    e2 === void 0 && (e2 = this.options.scrollbarTrackClickable);
    var o2 = document.createElement("div"), n2 = document.createElement("div");
    return o2.style.cssText = "position:absolute;z-index:9999;overflow:hidden;", n2.style.cssText = "box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;", n2.className = "bscroll-indicator", t3 === "horizontal" ? (o2.style.cssText += "height:7px;left:2px;right:2px;bottom:0;", n2.style.height = "100%", o2.className = "bscroll-horizontal-scrollbar") : (o2.style.cssText += "width:7px;bottom:2px;top:2px;right:1px;", n2.style.width = "100%", o2.className = "bscroll-vertical-scrollbar"), e2 || (o2.style.cssText += "pointer-events:none;"), o2.appendChild(n2), o2;
  }, t2.pluginName = "scrollbar", t2;
}();
/*!
 * better-scroll / nested-scroll
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function Ye() {
  for (var t2 = 0, e2 = 0, o2 = arguments.length; e2 < o2; e2++)
    t2 += arguments[e2].length;
  var n2 = Array(t2), i2 = 0;
  for (e2 = 0; e2 < o2; e2++)
    for (var r2 = arguments[e2], s2 = 0, a2 = r2.length; s2 < a2; s2++, i2++)
      n2[i2] = r2[s2];
  return n2;
}
var He = typeof window != "undefined", ze = He && navigator.userAgent.toLowerCase();
ze && /wechatdevtools/.test(ze), ze && ze.indexOf("android"), function() {
  if (typeof ze == "string") {
    var t2 = /os (\d\d?_\d(_\d)?)/.exec(ze);
    if (!t2)
      return false;
    var e2 = t2[1].split("_").map(function(t3) {
      return parseInt(t3, 10);
    });
    return !!(e2[0] === 13 && e2[1] >= 4);
  }
}();
if (He) {
  try {
    var Xe = {};
    Object.defineProperty(Xe, "passive", { get: function() {
      true;
    } }), window.addEventListener("test-passive", function() {
    }, Xe);
  } catch (t2) {
  }
}
function _e(t2, e2) {
  if (t2.findIndex)
    return t2.findIndex(e2);
  var o2 = -1;
  return t2.some(function(t3, n2, i2) {
    var r2 = e2(t3, n2, i2);
    if (r2)
      return o2 = n2, r2;
  }), o2;
}
var Ae = He && document.createElement("div").style, Ne = function() {
  if (!He)
    return false;
  for (var t2 = 0, e2 = [{ key: "standard", value: "transform" }, { key: "webkit", value: "webkitTransform" }, { key: "Moz", value: "MozTransform" }, { key: "O", value: "OTransform" }, { key: "ms", value: "msTransform" }]; t2 < e2.length; t2++) {
    var o2 = e2[t2];
    if (Ae[o2.value] !== void 0)
      return o2.key;
  }
  return false;
}();
function Fe(t2) {
  return Ne === false ? t2 : Ne === "standard" ? t2 === "transitionEnd" ? "transitionend" : t2 : Ne + t2.charAt(0).toUpperCase() + t2.substr(1);
}
Ne && Ne !== "standard" && Ne.toLowerCase();
Fe("transform"), Fe("transition");
He && Fe("perspective"), Fe("transitionTimingFunction"), Fe("transitionDuration"), Fe("transitionDelay"), Fe("transformOrigin"), Fe("transitionEnd"), Fe("transitionProperty");
var Ie = function() {
  function t2(t3) {
    this.ancestors = [], this.descendants = [], this.hooksManager = [], this.analyzed = false, this.selfScroll = t3;
  }
  return t2.create = function(e2) {
    return new t2(e2);
  }, t2.prototype.hasAncestors = function(t3) {
    return _e(this.ancestors, function(e2) {
      return e2[0] === t3;
    }) > -1;
  }, t2.prototype.hasDescendants = function(t3) {
    return _e(this.descendants, function(e2) {
      return e2[0] === t3;
    }) > -1;
  }, t2.prototype.addAncestor = function(t3, e2) {
    var o2 = this.ancestors;
    o2.push([t3, e2]), o2.sort(function(t4, e3) {
      return t4[1] - e3[1];
    });
  }, t2.prototype.addDescendant = function(t3, e2) {
    var o2 = this.descendants;
    o2.push([t3, e2]), o2.sort(function(t4, e3) {
      return t4[1] - e3[1];
    });
  }, t2.prototype.removeAncestor = function(t3) {
    var e2 = this.ancestors;
    if (e2.length) {
      var o2 = _e(this.ancestors, function(e3) {
        return e3[0] === t3;
      });
      if (o2 > -1)
        return e2.splice(o2, 1);
    }
  }, t2.prototype.removeDescendant = function(t3) {
    var e2 = this.descendants;
    if (e2.length) {
      var o2 = _e(this.descendants, function(e3) {
        return e3[0] === t3;
      });
      if (o2 > -1)
        return e2.splice(o2, 1);
    }
  }, t2.prototype.registerHooks = function(t3, e2, o2) {
    t3.on(e2, o2), this.hooksManager.push([t3, e2, o2]);
  }, t2.prototype.setAnalyzed = function(t3) {
    t3 === void 0 && (t3 = false), this.analyzed = t3;
  }, t2.prototype.purge = function() {
    var t3 = this;
    this.ancestors.forEach(function(e2) {
      e2[0].removeDescendant(t3);
    }), this.descendants.forEach(function(e2) {
      e2[0].removeAncestor(t3);
    }), this.hooksManager.forEach(function(t4) {
      var e2 = t4[0], o2 = t4[1], n2 = t4[2];
      e2.off(o2, n2);
    }), this.hooksManager = [];
  }, t2;
}(), Re = [{ key: "purgeNestedScroll", name: "purgeNestedScroll" }].map(function(t2) {
  return { key: t2.key, sourceKey: "plugins.nestedScroll." + t2.name };
}), je = function(t2) {
  t2.forEach(function(t3) {
    t3.enable();
  });
}, Ue = function(t2, e2) {
  t2.forEach(function(t3) {
    t3.hasHorizontalScroll !== e2.hasHorizontalScroll && t3.hasVerticalScroll !== e2.hasVerticalScroll || t3.disable();
  });
}, We = function(t2, e2) {
  for (var o2 = 0, n2 = t2.parentNode; n2 && n2 !== e2; )
    o2++, n2 = n2.parentNode;
  return o2;
}, Ke = function() {
  function t2(e2) {
    var o2 = this.handleOptions(e2), n2 = t2.instancesMap[o2];
    return n2 || ((n2 = t2.instancesMap[o2] = this).store = [], n2.hooksFn = []), n2.init(e2), n2;
  }
  return t2.getAllNestedScrolls = function() {
    var e2 = t2.instancesMap;
    return Object.keys(e2).map(function(t3) {
      return e2[t3];
    });
  }, t2.purgeAllNestedScrolls = function() {
    t2.getAllNestedScrolls().forEach(function(t3) {
      return t3.purgeNestedScroll();
    });
  }, t2.prototype.handleOptions = function(t3) {
    var e2 = t3.options.nestedScroll === true ? {} : t3.options.nestedScroll, o2 = { groupId: "INTERNAL_NESTED_SCROLL" };
    this.options = function(t4, e3) {
      for (var o3 in e3)
        t4[o3] = e3[o3];
      return t4;
    }(o2, e2);
    var n2, i2 = typeof this.options.groupId;
    return i2 !== "string" && i2 !== "number" && (n2 = "groupId must be string or number for NestedScroll plugin", console.error("[BScroll warn]: " + n2)), this.options.groupId;
  }, t2.prototype.init = function(t3) {
    t3.proxy(Re), this.addBScroll(t3), this.buildBScrollGraph(), this.analyzeBScrollGraph(), this.ensureEventInvokeSequence(), this.handleHooks(t3);
  }, t2.prototype.handleHooks = function(t3) {
    var e2 = this;
    this.registerHooks(t3.hooks, t3.hooks.eventTypes.destroy, function() {
      e2.deleteScroll(t3);
    });
  }, t2.prototype.deleteScroll = function(t3) {
    t3.wrapper.isBScrollContainer = void 0;
    var e2 = this.store, o2 = this.hooksFn, n2 = _e(e2, function(e3) {
      return e3.selfScroll === t3;
    });
    n2 > -1 && (e2[n2].purge(), e2.splice(n2, 1));
    var i2 = _e(o2, function(e3) {
      return e3[0] === t3.hooks;
    });
    if (i2 > -1) {
      var r2 = o2[i2], s2 = r2[0], a2 = r2[1], l2 = r2[2];
      s2.off(a2, l2), o2.splice(i2, 1);
    }
  }, t2.prototype.addBScroll = function(t3) {
    this.store.push(Ie.create(t3));
  }, t2.prototype.buildBScrollGraph = function() {
    for (var t3, e2, o2, n2, i2 = this.store, r2 = this.store.length, s2 = 0; s2 < r2; s2++) {
      o2 = (t3 = i2[s2]).selfScroll.wrapper;
      for (var a2 = 0; a2 < r2; a2++)
        if (n2 = (e2 = i2[a2]).selfScroll.wrapper, t3 !== e2 && o2.contains(n2)) {
          var l2 = We(n2, o2);
          t3.hasDescendants(e2) || t3.addDescendant(e2, l2), e2.hasAncestors(t3) || e2.addAncestor(t3, l2);
        }
    }
  }, t2.prototype.analyzeBScrollGraph = function() {
    this.store.forEach(function(t3) {
      if (!t3.analyzed) {
        var e2 = t3.ancestors, o2 = t3.descendants, n2 = t3.selfScroll;
        t3.registerHooks(n2, n2.eventTypes.beforeScrollStart, function() {
          var t4, i3 = e2.map(function(t5) {
            return t5[0].selfScroll;
          }), r2 = o2.map(function(t5) {
            return t5[0].selfScroll;
          });
          Ye(i3, r2).forEach(function(t5) {
            t5.pending && (t5.stop(), t5.resetPosition());
          }), function(t5) {
            var e3 = t5.hasHorizontalScroll, o3 = t5.hasVerticalScroll, n3 = t5.x, i4 = t5.y, r3 = t5.minScrollX, s2 = t5.maxScrollX, a2 = t5.minScrollY, l2 = t5.maxScrollY, h2 = false;
            return o3 ? h2 = i4 > a2 || i4 < l2 : e3 && (h2 = n3 > r3 || n3 < s2), h2;
          }(n2) && ((t4 = n2).scroller.reflow(), t4.resetPosition(0)), function(t5) {
            t5.forEach(function(t6) {
              var e3 = t6.scroller, o3 = e3.actions, n3 = e3.scrollBehaviorX, i4 = e3.scrollBehaviorY;
              o3.fingerMoved = true, o3.contentMoved = false, o3.directionLockAction.reset(), n3.start(), i4.start(), n3.resetStartPos(), i4.resetStartPos(), o3.startTime = +new Date();
            });
          }(i3), Ue(i3, n2);
        }), t3.registerHooks(n2, n2.eventTypes.touchEnd, function() {
          var t4 = e2.map(function(t5) {
            return t5[0].selfScroll;
          }), n3 = o2.map(function(t5) {
            return t5[0].selfScroll;
          });
          je(Ye(t4, n3));
        });
        var i2 = n2.scroller.actions.hooks;
        t3.registerHooks(i2, i2.eventTypes.detectMovingDirection, function() {
          var t4 = e2.map(function(t5) {
            return t5[0].selfScroll;
          }), o3 = t4[0], i3 = t4.slice(1), r2 = n2.scroller.actions.contentMoved, s2 = t4.length === 0;
          if (r2)
            Ue(t4, n2);
          else if (!s2 && function(t5) {
            var e3 = t5.hasHorizontalScroll, o4 = t5.hasVerticalScroll, n3 = t5.x, i4 = t5.y, r3 = t5.minScrollX, s3 = t5.maxScrollX, a2 = t5.minScrollY, l2 = t5.maxScrollY, h2 = t5.movingDirectionX, c2 = t5.movingDirectionY, u2 = false;
            return o4 ? u2 = i4 >= a2 && c2 === -1 || i4 <= l2 && c2 === 1 : e3 && (u2 = n3 >= r3 && h2 === -1 || n3 <= s3 && h2 === 1), u2;
          }(n2))
            return Ue([n2], n2), o3 && je([o3]), Ue(i3, n2), true;
        }), t3.setAnalyzed(true);
      }
    });
  }, t2.prototype.ensureEventInvokeSequence = function() {
    this.store.slice().sort(function(t3, e2) {
      return t3.descendants.length - e2.descendants.length;
    }).forEach(function(t3) {
      t3.selfScroll.scroller.actionsHandler.rebindDOMEvents();
    });
  }, t2.prototype.registerHooks = function(t3, e2, o2) {
    t3.on(e2, o2, this), this.hooksFn.push([t3, e2, o2]);
  }, t2.prototype.purgeNestedScroll = function() {
    var e2 = this.options.groupId;
    this.store.forEach(function(t3) {
      t3.purge();
    }), this.store = [], this.hooksFn.forEach(function(t3) {
      var e3 = t3[0], o2 = t3[1], n2 = t3[2];
      e3.off(o2, n2);
    }), this.hooksFn = [], delete t2.instancesMap[e2];
  }, t2.pluginName = "nestedScroll", t2.instancesMap = {}, t2;
}();
const Ve = { class: "mf-loading-container" }, qe = { props: { value: { type: Boolean, default: false }, text: { type: String, default: "loading" }, type: { type: String, default: "random" } }, setup(p2) {
  const d2 = p2, f2 = t(() => e(() => function(t2) {
    switch (t2) {
      case "./components/circular.vue":
        return Promise.resolve().then(function() {
          return en;
        });
      case "./components/dots.vue":
        return Promise.resolve().then(function() {
          return fn;
        });
      case "./components/spinner.vue":
        return Promise.resolve().then(function() {
          return ui;
        });
      default:
        return new Promise(function(e2, o2) {
          (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(o2.bind(null, new Error("Unknown variable dynamic import: " + t2)));
        });
    }
  }(`./components/${y2.svg}.vue`))), y2 = o({ ops: ["circular", "spinner", "dots"], svg: "dots" }), m2 = () => y2.ops[Math.round(2 * Math.random())];
  return n(() => d2.type, (t2, e2) => {
    ((t3) => {
      let e3;
      e3 = y2.ops.includes(t3) ? t3 : m2(), y2.svg = e3;
    })(t2);
  }, { immediate: true }), n(() => d2.value, (t2) => {
    t2 && (y2.ops.includes(y2.type) || (y2.svg = y2.random()));
  }, { immediate: true }), (t2, e2) => (i(), r("div", Ve, [s("span", { class: a({ mr: d2.type === "default" }) }, l(d2.text), 3), (i(), h(c(u(f2))))]));
} }, $e = { class: "--atvt-container", style: { display: "flex", "align-items": "center", "justify-content": "center" } }, Ge = ["opacity"], Ze = ["fill", "opacity"], Je = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.9166666666666666s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, Qe = ["opacity"], to = ["fill", "opacity"], eo = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.8333333333333334s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, oo = ["opacity"], no = ["fill", "opacity"], io = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.75s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, ro = ["opacity"], so = ["fill", "opacity"], ao = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.6666666666666666s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, lo = ["opacity"], ho = ["fill", "opacity"], co = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.5833333333333334s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, uo = ["opacity"], po = ["fill", "opacity"], fo = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.5s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, yo = ["opacity"], mo = ["fill", "opacity"], vo = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.4166666666666667s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, go = ["opacity"], ko = ["fill", "opacity"], wo = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.3333333333333333s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, To = ["opacity"], bo = ["fill", "opacity"], So = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.25s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, Po = ["opacity"], xo = ["fill", "opacity"], Eo = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.16666666666666666s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, Do = ["opacity"], Mo = ["fill", "opacity"], Co = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.08333333333333333s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, Bo = ["opacity"], Oo = ["fill", "opacity"], Lo = { key: 0, attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "0s", repeatCount: "indefinite", style: { "animation-play-state": "running", "animation-delay": "0s" } }, Yo = Object.assign({ name: "ActivityIndicator" }, { props: { hidesWhenStopped: { type: Boolean, default: false }, modelValue: { type: [Number, String], default: 1 / 12 }, animate: { type: Boolean, default: true }, tintColor: { type: String, default: "#999999" } }, setup: function(t2, { expose: e2 }) {
  const a2 = t2, l2 = o({ animating: false, percent: 1 / 12 }), h2 = (t3) => l2.percent >= t3 / 12 || l2.animating ? 1 : 0, c2 = () => {
    l2.animating = true, l2.percent = 1 / 12;
  }, f2 = () => {
    l2.animating = false;
  };
  return n(() => a2.modelValue, (t3) => {
    l2.percent = t3;
  }, { immediate: true }), n(() => a2.animate, (t3) => {
    t3 ? c2() : f2();
  }, { immediate: true }), e2({ isAnimating: () => l2.animating, startAnimating: c2, stopAnimating: f2 }), (e3, o2) => (i(), r("div", $e, [(i(), r("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "100%", height: "100%", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", style: p([{ margin: "auto", display: "block", "background-repeat-y": "initial", "background-repeat-x": "initial", background: "transparent" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [s("g", { transform: "rotate(0 50 50)", style: p([{ transform: "matrix(1, 0, 0, 1, 0, 0)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(1) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(1), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", Je)) : d("", true)], 12, Ze)], 12, Ge), s("g", { transform: "rotate(30 50 50)", style: p([{ transform: "matrix(0.866025, 0.5, -0.5, 0.866025, 31.6987, -18.3013)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(2) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(2), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", eo)) : d("", true)], 12, to)], 12, Qe), s("g", { transform: "rotate(60 50 50)", style: p([{ transform: "matrix(0.5, 0.866025, -0.866025, 0.5, 68.3013, -18.3013)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(3) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(3), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", io)) : d("", true)], 12, no)], 12, oo), s("g", { transform: "rotate(90 50 50)", style: p([{ transform: "matrix(6.12323e-17, 1, -1, 6.12323e-17, 100, 0)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(4) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(4), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", ao)) : d("", true)], 12, so)], 12, ro), s("g", { transform: "rotate(120 50 50)", style: p([{ transform: "matrix(-0.5, 0.866025, -0.866025, -0.5, 118.301, 31.6987)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(5) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(5), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", co)) : d("", true)], 12, ho)], 12, lo), s("g", { transform: "rotate(150 50 50)", style: p([{ transform: "matrix(-0.866025, 0.5, -0.5, -0.866025, 118.301, 68.3013)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(6) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(6), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", fo)) : d("", true)], 12, po)], 12, uo), s("g", { transform: "rotate(180 50 50)", style: p([{ transform: "matrix(-1, 1.22465e-16, -1.22465e-16, -1, 100, 100)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(7) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(7), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", vo)) : d("", true)], 12, mo)], 12, yo), s("g", { transform: "rotate(210 50 50)", style: p([{ transform: "matrix(-0.866025, -0.5, 0.5, -0.866025, 68.3013, 118.301)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(8) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(8), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", wo)) : d("", true)], 12, ko)], 12, go), s("g", { transform: "rotate(240 50 50)", style: p([{ transform: "matrix(-0.5, -0.866025, 0.866025, -0.5, 31.6987, 118.301)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(9) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(9), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", So)) : d("", true)], 12, bo)], 12, To), s("g", { transform: "rotate(270 50 50)", style: p([{ transform: "matrix(-1.83697e-16, -1, 1, -1.83697e-16, 7.10543e-15, 100)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(10) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(10), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", Eo)) : d("", true)], 12, xo)], 12, Po), s("g", { transform: "rotate(300 50 50)", style: p([{ transform: "matrix(0.5, -0.866025, 0.866025, 0.5, -18.3013, 68.3013)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(11) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(11), style: p([{ "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]) }, [u(l2).animating ? (i(), r("animate", Co)) : d("", true)], 12, Mo)], 12, Do), s("g", { transform: "rotate(330 50 50)", style: p([{ transform: "matrix(0.866025, -0.5, 0.5, 0.866025, -18.3013, 31.6987)", "animation-delay": "0s" }, { "animation-play-state": u(l2).animating ? "running" : "paused" }]), opacity: h2(12) }, [s("rect", { x: "47.5", y: "21", rx: "2.5", ry: "3.06", width: "5", height: "18", fill: t2.tintColor, opacity: h2(12), style: p({ "animation-play-state": u(l2).animating ? "running" : "paused" }) }, [u(l2).animating ? (i(), r("animate", Lo)) : d("", true)], 12, Oo)], 12, Bo)], 4))]));
} }), Ho = [Yo], zo = function(t2) {
  Ho.forEach((e2) => {
    t2.component(e2.name, e2);
  });
};
typeof window != "undefined" && window.Vue && zo(window.Vue), Yo.install = zo;
var Xo = (t2, e2) => {
  for (const [o2, n2] of e2)
    t2[o2] = n2;
  return t2;
};
const _o = { class: "rfa__" }, Ao = { class: "rfa__scroll-content" }, No = { key: 0, class: "rfa__before-trigger" }, Fo = { class: "rfa__after-trigger" }, Io = { key: 0, class: "rfa__pullup-wr" }, Ro = { key: 0, class: "rfa__before-trigger" }, jo = { class: "rfa__after-trigger" }, Uo = { class: "rfa__scroll-content" }, Wo = { name: "refreshable" };
var Ko = Xo(Object.assign(Wo, { props: { probeType: { type: Number, default: 1 }, click: { type: Boolean, default: true }, direction: { type: String, default: "vertical" }, scrollbar: { type: null, default: false }, startY: { type: Number, default: 0 }, startX: { type: Number, default: 0 }, freeScroll: { type: Boolean, default: false }, observeScroll: { type: Boolean, default: false }, observeBeforeScroll: { type: Boolean, default: false }, observeScrollEnd: { type: Boolean, default: false }, mouseWheel: { type: Boolean, default: false }, pullup: { type: [Object, Boolean], default: false }, pulldown: { type: [Object, Boolean], default: false }, nestedScroll: { type: [Object, Boolean], default: false }, eventPassthrough: { type: String, default: "" } }, emits: ["scroll", "beforeScrollStart", "pullingUp", "pullingDown", "scrollEnd"], setup: function(e2, { expose: n2, emit: h2 }) {
  const c2 = e2;
  Xt.use(Wt), Xt.use(Qt), Xt.use(ce), Xt.use(Le), Xt.use(Ke);
  const p2 = function(t2) {
    if (!t2)
      return { top: 0, left: 0, width: 0, height: 0 };
    if (t2 instanceof window.SVGElement) {
      const e3 = t2.getBoundingClientRect();
      return { top: e3.top, left: e3.left, width: e3.width, height: e3.height };
    }
    return { top: t2.offsetTop, left: t2.offsetLeft, width: t2.offsetWidth, height: t2.offsetHeight };
  }, S2 = function(t2) {
    return Object.prototype.toString.call(t2);
  }, P2 = f(null), x2 = f(null), E2 = f(null), D2 = f(null), M2 = f(null), C2 = o({ isPullingdown: false, isPrePullingdown: false, isPullingdownDone: false, isPullingup: false, isPullingupDone: false, hasMore: true, pullupLoad: void 0, pulldownLoad: void 0, indPer: 0.1, atLeast: 1e3, startDown: 0, startUp: 0, sw1: void 0, sw2: void 0, slot1: void 0, slot2: void 0 });
  let B2, O2, L2 = 0;
  const Y2 = t(() => {
    var _a, _b, _c, _d, _e2, _f, _g, _h;
    return C2.hasMore ? C2.isPullingup ? (_b = (_a = C2.pullupLoad) == null ? void 0 : _a.text) == null ? void 0 : _b.loading : C2.isPullingupDone ? (_d = (_c = C2.pullupLoad) == null ? void 0 : _c.text) == null ? void 0 : _d.done : (_f = (_e2 = C2.pullupLoad) == null ? void 0 : _e2.text) == null ? void 0 : _f.normal : (_h = (_g = C2.pullupLoad) == null ? void 0 : _g.text) == null ? void 0 : _h.noMore;
  }), H2 = t(() => {
    var _a, _b, _c, _d, _e2, _f, _g, _h;
    return z2 ? void 0 : C2.isPrePullingdown ? (_b = (_a = C2.pulldownLoad) == null ? void 0 : _a.text) == null ? void 0 : _b.holding : C2.isPullingdown ? (_d = (_c = C2.pulldownLoad) == null ? void 0 : _c.text) == null ? void 0 : _d.loading : C2.isPullingdownDone ? (_f = (_e2 = C2.pulldownLoad) == null ? void 0 : _e2.text) == null ? void 0 : _f.done : (_h = (_g = C2.pulldownLoad) == null ? void 0 : _g.text) == null ? void 0 : _h.normal;
  }), z2 = t(() => c2.pulldown && S2(c2.pulldown) === "[object Boolean]" && c2.pulldown === true);
  y(() => {
    A2(), _();
  }), m(() => {
    X2();
  }), v(() => {
    nt2();
  });
  const X2 = () => {
    I2(), g(() => j2());
  }, _ = () => {
    g(() => N2());
  }, A2 = () => {
    B2 = null;
  }, N2 = async () => {
    O2 = function(t3, e3) {
      let o2 = new Date();
      return function() {
        new Date() - o2 > e3 && (t3.apply(this, arguments), o2 = new Date());
      };
    }(F2, 100);
    const t2 = document.querySelector(".rfa__ind");
    t2 && (L2 = +getComputedStyle(t2).fontSize.replace(/px/gi, "")), M2.value && M2.value.isAnimating() && M2.value.stopAnimating(), C2.startDown = 0, C2.startUp = 0, await R2();
  }, F2 = (t2) => {
    var _a;
    if (t2 === void 0 || t2 < 0)
      return;
    const e3 = 2.8 * L2;
    C2.isPrePullingdown = t2 !== 0 && t2 > e3;
    const o2 = +((_a = C2.pulldownLoad) == null ? void 0 : _a.threshold);
    if (!o2)
      return;
    const n3 = o2 + 1.1 * e3;
    C2.indPer = (t2 - 0.6 * o2) / n3;
  }, I2 = () => {
    let t2;
    return c2.direction === "vertical" ? (E2.value && P2.value && (E2.value.style.minHeight = `${p2(P2.value).height + 1}px`), t2 = P2.value) : c2.direction === "horizontal" && (D2.value && x2.value && (D2.value.style.minWidth = `${p2(x2.value).width + 1}px`), t2 = D2.value), t2;
  }, R2 = () => new Promise((t2, e3) => {
    let o2 = I2();
    if (!o2)
      return void e3("cannot scroll in dom");
    c2.pullup && (C2.pullupLoad = J2()), c2.pulldown && (C2.pulldownLoad = Q2());
    const n3 = { nestedScroll: false, bounce: c2.direction === "vertical" ? { top: true, bottom: true } : { left: true, right: true }, swipeBounceTime: 200, eventPassthrough: ["horizontal", "vertical"].includes(c2.eventPassthrough) ? c2.eventPassthrough : "" };
    c2.nestedScroll && (S2(c2.nestedScroll) === "[object Boolean]" ? n3.nestedScroll = true : S2(c2.nestedScroll) === "[object Object]" && (n3.nestedScroll = S2(c2.nestedScroll.nested) === "[object Boolean]" && c2.nestedScroll.nested, S2(c2.nestedScroll.bounce) === "[object Boolean]" && (n3.bounce = c2.direction === "vertical" ? { top: c2.nestedScroll.bounce, bottom: c2.nestedScroll.bounce } : { left: c2.nestedScroll.bounce, right: c2.nestedScroll.bounce })));
    const i2 = __spreadProps(__spreadValues({ probeType: c2.probeType, click: c2.click, stopPropagation: true, scrollbar: c2.scrollbar, scrollY: c2.direction === "vertical", scrollX: c2.direction === "horizontal", startY: c2.startY, startX: c2.startX }, n3), { pullUpLoad: C2.pullupLoad, pullDownRefresh: C2.pulldownLoad });
    B2 = new Xt(o2, Object.assign(i2, c2.mouseWheel ? { mouseWheel: { speed: 2, invert: false, easeTime: 300 } } : {})), B2.on("scroll", (t3) => U2(t3)), c2.observeBeforeScroll && B2.on("beforeScrollStart", W2), ot2(), C2.pullupLoad && tt2(), C2.pulldownLoad && et2(), t2(true);
  }), j2 = () => {
    B2 && g(() => B2.refresh());
  }, U2 = (t2) => {
    c2.observeScroll && h2("scroll", t2), c2.pulldown && !C2.isPullingdown && O2(t2 == null ? void 0 : t2.y);
  }, W2 = () => {
    h2("beforeScrollStart");
  }, K2 = () => {
    C2.hasMore && (C2.startUp = new Date(), C2.isPullingup = true, h2("pullingUp"));
  }, V2 = () => {
    C2.isPullingdown || (C2.startDown = new Date(), C2.isPullingdown = true, C2.isPrePullingdown = false, h2("pullingDown"));
  }, q2 = () => {
    if (C2.pullupLoad || C2.pulldownLoad) {
      if (!C2.isPullingup && !C2.isPullingdown)
        return;
      g(() => {
        j2();
      });
    }
    c2.observeScrollEnd && h2("scrollEnd");
  }, $2 = (t2) => {
    if (!C2.pullupLoad || !C2.isPullingup)
      return;
    const e3 = new Date() - C2.startUp < C2.atLeast ? C2.atLeast : 500;
    setTimeout(() => {
      g(() => B2.finishPullUp()), j2(), C2.isPullingup = false, C2.hasMore = t2, ((t3) => {
        C2.isPullingupDone = t3, setTimeout(() => {
          C2.isPullingupDone = !t3;
        }, 800);
      })(true);
    }, e3);
  }, G2 = () => {
    if (C2.pulldownLoad) {
      if (C2.isPullingdown) {
        const t2 = new Date() - C2.startDown < C2.atLeast ? C2.atLeast : z2 ? 20 : 250;
        setTimeout(() => {
          C2.isPullingdown = false, !z2 && ((t3) => {
            C2.isPullingdownDone = t3, setTimeout(() => {
              C2.isPullingdownDone = !t3;
            }, 600);
          })(true), g(() => B2.finishPullDown());
        }, t2);
      }
      Z2();
    }
  }, Z2 = () => {
    C2.hasMore || (C2.hasMore = true, C2.pullupLoad && setTimeout(() => B2.openPullUp(C2.pullupLoad), 20));
  }, J2 = () => {
    var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n2;
    let t2 = false;
    const e3 = S2(c2.pullup), o2 = { normal: "pull to load more", noMore: "that is all", done: "load succeed", loading: "loading" };
    return e3 === "[object Boolean]" ? t2 = { threshold: 10, text: o2, img: "random" } : e3 === "[object Object]" && (t2 = { threshold: +((_a = c2.pullup) == null ? void 0 : _a.threshold) || 10, text: { normal: (_d = (_c = (_b = c2.pullup) == null ? void 0 : _b.text) == null ? void 0 : _c.normal) != null ? _d : o2.normal, noMore: (_g = (_f = (_e2 = c2.pullup) == null ? void 0 : _e2.text) == null ? void 0 : _f.noMore) != null ? _g : o2.noMore, done: (_i = (_h = c2.pullup) == null ? void 0 : _h.text.done) != null ? _i : o2.done, loading: (_l = (_k = (_j = c2.pullup) == null ? void 0 : _j.text) == null ? void 0 : _k.loading) != null ? _l : o2.loading }, img: ["default", "circular", "spinner"].includes((_m = c2.pullup) == null ? void 0 : _m.img) ? (_n2 = c2.pullup) == null ? void 0 : _n2.img : "random" }), t2;
  }, Q2 = () => {
    var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n2, _o2;
    let t2 = false;
    const e3 = { loading: "refreshing", done: "refresh succeed", normal: "pull to refresh", holding: "release to refresh" }, o2 = S2(c2.pulldown);
    return o2 === "[object Boolean]" ? t2 = { threshold: 50, text: e3, img: "random" } : o2 === "[object Object]" && (t2 = { threshold: +((_a = c2.pulldown) == null ? void 0 : _a.threshold) || 50, text: { loading: (_d = (_c = (_b = c2.pulldown) == null ? void 0 : _b.text) == null ? void 0 : _c.loading) != null ? _d : e3.loading, done: (_g = (_f = (_e2 = c2.pulldown) == null ? void 0 : _e2.text) == null ? void 0 : _f.done) != null ? _g : e3.done, normal: (_j = (_i = (_h = c2.pulldown) == null ? void 0 : _h.text) == null ? void 0 : _i.normal) != null ? _j : e3.normal, holding: (_m = (_l = (_k = c2.pulldown) == null ? void 0 : _k.text) == null ? void 0 : _l.holding) != null ? _m : e3.holding }, img: ["default", "circular", "spinner"].includes((_n2 = c2.pulldown) == null ? void 0 : _n2.img) ? (_o2 = c2.pulldown) == null ? void 0 : _o2.img : "random" }), t2;
  }, tt2 = () => {
    B2.on("pullingUp", K2);
  }, et2 = () => {
    B2.on("pullingDown", V2);
  }, ot2 = () => {
    B2.on("scrollEnd", (t2) => q2());
  }, nt2 = async () => {
    if (!B2)
      return Promise.resolve();
    await new Promise((t2) => {
      setTimeout(() => {
        B2.off("scroll", U2), c2.observeBeforeScroll && B2.off("beforeScrollStart", W2), B2.off("scrollEnd", q2), C2.pullupLoad && B2.off("pullingUp", K2), C2.pulldownLoad && B2.off("pullingDown", V2), B2.destroy(), t2();
      }, 600);
    });
  };
  return n2({ autoRefresh: () => {
    setTimeout(() => {
      (async () => {
        if (!B2 || !C2.pulldownLoad) {
          if (!c2.pulldown)
            return;
          await R2();
        }
        g(() => {
          B2.autoPullDownRefresh(), Z2();
        });
      })();
    }, 20);
  }, setNeedsLayout: j2, endPullUp: (t2) => {
    B2 && g(() => $2(t2));
  }, endPullDown: () => {
    B2 && g(() => G2());
  }, resumePullup: Z2 }), (t2, e3) => (i(), r("div", _o, [c2.direction === "vertical" ? (i(), r("div", { key: 0, ref: (t3, e4) => {
    e4.sw1 = t3, P2.value = t3;
  }, class: "rfa__wr", style: { position: "absolute", left: "0", top: "0", right: "0", bottom: "0", overflow: "hidden" } }, [s("div", Ao, [k(t2.$slots, "pulldown", { dto: { isPullingdown: u(C2).isPullingdown, isPullingdownDone: u(C2).isPullingdownDone, indPer: u(C2).indPer } }, () => [c2.pulldown ? (i(), r("div", { key: 0, class: a(["rfa__pulldown-wr", { "rfa__pulldown-wr-ing": u(C2).isPullingdown }]) }, [u(C2).isPullingdown ? d("", true) : (i(), r("div", No, [s("span", null, l(u(H2)), 1)])), s("div", Fo, [w(T(qe, { text: u(H2), type: c2.pulldown.img, modelValue: u(C2).isPullingdown, "onUpdate:modelValue": e3[0] || (e3[0] = (t3) => u(C2).isPullingdown = t3) }, null, 8, ["text", "type", "modelValue"]), [[b, !u(z2) && u(C2).isPullingdown]]), w(T(u(Yo), { class: "rfa__ind rfa__ind_mn", ref: (t3, e4) => {
    e4.ind = t3, M2.value = t3;
  }, modelValue: u(C2).indPer, "onUpdate:modelValue": e3[1] || (e3[1] = (t3) => u(C2).indPer = t3), animate: u(C2).isPullingdown }, null, 8, ["modelValue", "animate"]), [[b, u(z2)]])])], 2)) : d("", true)], true), s("div", { ref: (t3, e4) => {
    e4.slot1 = t3, E2.value = t3;
  }, class: a({ "rfa__main-ing": u(C2).isPullingdown, rfa__main: c2.pulldown }) }, [k(t2.$slots, "default", {}, void 0, true)], 2), k(t2.$slots, "pullup", { dto: { isPullingup: u(C2).isPullingup, isPullingupDone: u(C2).isPullingupDone, hasMore: u(C2).hasMore } }, () => [c2.pullup ? (i(), r("div", Io, [u(C2).isPullingup ? d("", true) : (i(), r("div", Ro, [s("span", null, l(u(Y2)), 1)])), w(s("div", jo, [T(qe, { text: u(Y2), type: c2.pullup.img, modelValue: u(C2).isPullingup, "onUpdate:modelValue": e3[2] || (e3[2] = (t3) => u(C2).isPullingup = t3) }, null, 8, ["text", "type", "modelValue"])], 512), [[b, u(C2).isPullingup && u(C2).hasMore]])])) : d("", true)], true)])], 512)) : c2.direction === "horizontal" ? (i(), r("div", { key: 1, ref: (t3, e4) => {
    e4.sw2 = t3, x2.value = t3;
  }, class: "rfah__wr" }, [s("div", Uo, [s("div", { ref: (t3, e4) => {
    e4.slot2 = t3, D2.value = t3;
  }, style: { "white-space": "nowrap", overflow: "hidden" } }, [k(t2.$slots, "default", {}, void 0, true)], 512)])], 512)) : d("", true)]));
} }), [["__scopeId", "data-v-0fb52320"]]);
const Vo = [Ko], qo = function(t2) {
  Vo.forEach((e2) => {
    t2.component(e2.name, e2);
  });
};
typeof window != "undefined" && window.Vue && qo(window.Vue);
const $o = { class: "mf-loading__sp", style: {} }, Go = { version: "1.1", id: "L9", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "100%", height: "100%", style: { display: "block", "background-repeat-y": "initial", "background-repeat-x": "initial", background: "transparent", margin: "auto" }, x: "0px", y: "0px", viewBox: "0 0 100 100", "enable-background": "new 0 0 0 0", "xml:space": "preserve" }, Zo = ["fill"], Jo = [((t2) => (S("data-v-4553d052"), t2 = t2(), P(), t2))(() => s("animateTransform", { attributeName: "transform", attributeType: "XML", type: "rotate", dur: "1s", from: "0 50 50", to: "360 50 50", repeatCount: "indefinite" }, null, -1))], Qo = { name: "circular" };
var tn = Xo(Object.assign(Qo, { props: { tintColor: { type: String, required: false, default: "#aaaaaa" } }, setup: function(t2) {
  return (e2, o2) => (i(), r("div", $o, [(i(), r("svg", Go, [s("path", { fill: t2.tintColor, d: "M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" }, Jo, 8, Zo)]))]));
} }), [["__scopeId", "data-v-4553d052"]]), en = Object.freeze({ __proto__: null, [Symbol.toStringTag]: "Module", default: tn });
const on = (t2) => (S("data-v-983dbf1a"), t2 = t2(), P(), t2), nn = { class: "mf-loading__sp", style: {} }, rn = { version: "1.1", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "100%", height: "100%", style: { display: "block", "background-repeat-y": "initial", "background-repeat-x": "initial", background: "transparent", margin: "auto" }, x: "0px", y: "0px", viewBox: "0 0 100 100", "enable-background": "new 0 0 0 0", "xml:space": "preserve" }, sn = ["fill"], an = [on(() => s("animate", { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: "0.1" }, null, -1))], ln = ["fill"], hn = [on(() => s("animate", { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: "0.2" }, null, -1))], cn = ["fill"], un = [on(() => s("animate", { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: "0.3" }, null, -1))], pn = { name: "dots" };
var dn = Xo(Object.assign(pn, { props: { tintColor: { type: String, required: false, default: "#aaaaaa" } }, setup: function(t2) {
  return (e2, o2) => (i(), r("div", nn, [(i(), r("svg", rn, [s("circle", { fill: t2.tintColor, stroke: "none", cx: "6", cy: "50", r: "6" }, an, 8, sn), s("circle", { fill: t2.tintColor, stroke: "none", cx: "26", cy: "50", r: "6" }, hn, 8, ln), s("circle", { fill: t2.tintColor, stroke: "none", cx: "46", cy: "50", r: "6" }, un, 8, cn)]))]));
} }), [["__scopeId", "data-v-983dbf1a"]]), fn = Object.freeze({ __proto__: null, [Symbol.toStringTag]: "Module", default: dn });
const yn = (t2) => (S("data-v-262d902f"), t2 = t2(), P(), t2), mn = { class: "mf-loading__sp", style: {} }, vn = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "100%", height: "100%", style: { display: "block", "background-repeat-y": "initial", "background-repeat-x": "initial", background: "transparent", margin: "auto", "shape-rendering": "auto" }, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, gn = { transform: "rotate(0 50 50)" }, kn = ["fill"], wn = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.8045977011494252s", repeatCount: "indefinite" }, null, -1))], Tn = { transform: "rotate(24 50 50)" }, bn = ["fill"], Sn = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.7471264367816091s", repeatCount: "indefinite" }, null, -1))], Pn = { transform: "rotate(48 50 50)" }, xn = ["fill"], En = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.689655172413793s", repeatCount: "indefinite" }, null, -1))], Dn = { transform: "rotate(72 50 50)" }, Mn = ["fill"], Cn = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.6321839080459769s", repeatCount: "indefinite" }, null, -1))], Bn = { transform: "rotate(96 50 50)" }, On = ["fill"], Ln = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.5747126436781609s", repeatCount: "indefinite" }, null, -1))], Yn = { transform: "rotate(120 50 50)" }, Hn = ["fill"], zn = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.5172413793103448s", repeatCount: "indefinite" }, null, -1))], Xn = { transform: "rotate(144 50 50)" }, _n = ["fill"], An = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.4597701149425287s", repeatCount: "indefinite" }, null, -1))], Nn = { transform: "rotate(168 50 50)" }, Fn = ["fill"], In = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.4022988505747126s", repeatCount: "indefinite" }, null, -1))], Rn = { transform: "rotate(192 50 50)" }, jn = ["fill"], Un = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.3448275862068965s", repeatCount: "indefinite" }, null, -1))], Wn = { transform: "rotate(216 50 50)" }, Kn = ["fill"], Vn = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.28735632183908044s", repeatCount: "indefinite" }, null, -1))], qn = { transform: "rotate(240 50 50)" }, $n = ["fill"], Gn = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.22988505747126434s", repeatCount: "indefinite" }, null, -1))], Zn = { transform: "rotate(264 50 50)" }, Jn = ["fill"], Qn = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.17241379310344826s", repeatCount: "indefinite" }, null, -1))], ti = { transform: "rotate(288 50 50)" }, ei = ["fill"], oi = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.11494252873563217s", repeatCount: "indefinite" }, null, -1))], ni = { transform: "rotate(312 50 50)" }, ii = ["fill"], ri = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "-0.057471264367816084s", repeatCount: "indefinite" }, null, -1))], si = { transform: "rotate(336 50 50)" }, ai = ["fill"], li = [yn(() => s("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "0.8620689655172413s", begin: "0s", repeatCount: "indefinite" }, null, -1))], hi = { name: "spinner" };
var ci = Xo(Object.assign(hi, { props: { tintColor: { type: String, required: false, default: "#aaaaaa" } }, setup: function(t2) {
  return (e2, o2) => (i(), r("div", mn, [(i(), r("svg", vn, [s("g", gn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, wn, 8, kn)]), s("g", Tn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, Sn, 8, bn)]), s("g", Pn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, En, 8, xn)]), s("g", Dn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, Cn, 8, Mn)]), s("g", Bn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, Ln, 8, On)]), s("g", Yn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, zn, 8, Hn)]), s("g", Xn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, An, 8, _n)]), s("g", Nn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, In, 8, Fn)]), s("g", Rn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, Un, 8, jn)]), s("g", Wn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, Vn, 8, Kn)]), s("g", qn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, Gn, 8, $n)]), s("g", Zn, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, Qn, 8, Jn)]), s("g", ti, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, oi, 8, ei)]), s("g", ni, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, ri, 8, ii)]), s("g", si, [s("rect", { x: "48", y: "27.5", rx: "2", ry: "2.86", width: "4", height: "13", fill: t2.tintColor }, li, 8, ai)])]))]));
} }), [["__scopeId", "data-v-262d902f"]]), ui = Object.freeze({ __proto__: null, [Symbol.toStringTag]: "Module", default: ci });
export { Ko as Refreshable, qo as default };
