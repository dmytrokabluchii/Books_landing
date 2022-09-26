/**!
 * lg-fullscreen.js | 1.2.0 | May 20th 2020
 * http://sachinchoolur.github.io/lg-fullscreen.js
 * Copyright (c) 2016 Sachin N; 
 * @license GPLv3 
 */
 !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.LgFullscreen=e()}}(function(){var e,n,l;return function(){function e(n,l,t){function r(o,c){if(!l[o]){if(!n[o]){var s="function"==typeof require&&require;if(!c&&s)return s(o,!0);if(u)return u(o,!0);var i=new Error("Cannot find module '"+o+"'");throw i.code="MODULE_NOT_FOUND",i}var f=l[o]={exports:{}};n[o][0].call(f.exports,function(e){return r(n[o][1][e]||e)},f,f.exports,e,n,l,t)}return l[o].exports}for(var u="function"==typeof require&&require,o=0;o<t.length;o++)r(t[o]);return r}return e}()({1:[function(n,l,t){!function(n,l){if("function"==typeof e&&e.amd)e([],l);else if(void 0!==t)l();else{var r={exports:{}};l(),n.lgFullscreen=r.exports}}(this,function(){"use strict";function e(){return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement}var n=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var l=arguments[n];for(var t in l)Object.prototype.hasOwnProperty.call(l,t)&&(e[t]=l[t])}return e},l={fullScreen:!0},t=function e(t){return this.el=t,this.core=window.lgData[this.el.getAttribute("lg-uid")],this.core.s=n({},l,this.core.s),this.init(),this};t.prototype.init=function(){var e="";if(this.core.s.fullScreen){if(!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled))return;e='<button aria-label="Toggle fullscreen" class="lg-fullscreen lg-icon"></button>',this.core.outer.querySelector(".lg-toolbar").insertAdjacentHTML("beforeend",e),this.fullScreen()}},t.prototype.requestFullscreen=function(){var e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen()},t.prototype.exitFullscreen=function(){document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()},t.prototype.fullScreen=function(){var n=this;utils.on(document,"fullscreenchange.lgfullscreen webkitfullscreenchange.lgfullscreen mozfullscreenchange.lgfullscreen MSFullscreenChange.lgfullscreen",function(){utils.hasClass(n.core.outer,"lg-fullscreen-on")?utils.removeClass(n.core.outer,"lg-fullscreen-on"):utils.addClass(n.core.outer,"lg-fullscreen-on")}),utils.on(this.core.outer.querySelector(".lg-fullscreen"),"click.lg",function(){e()?n.exitFullscreen():n.requestFullscreen()})},t.prototype.destroy=function(){e()&&this.exitFullscreen(),utils.off(document,".lgfullscreen")},window.lgModules.fullscreen=t})},{}]},{},[1])(1)});