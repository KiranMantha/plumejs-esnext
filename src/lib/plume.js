//https://gist.github.com/WebReflection/d3aad260ac5007344a0731e797c8b1a4
//export * from './core';
//import { render, html } from "uhtml";
//import "./router";
import { useContext, useRef, useState } from "augmentor";
import { Component } from "./component";
import "./extenders";
import { html } from './html';
import "./routerService";
import { Service } from "./service";

const render = (nodeOrSelector,) => {

}

export { render, html, Component, Service, useRef, useState, useContext };

