//https://gist.github.com/WebReflection/d3aad260ac5007344a0731e797c8b1a4
//export * from './core';
import { render, html } from "uhtml";
import "./extenders";
import "./routerService";
//import "./router";
import { useRef, useState, useContext } from "augmentor";
import { Component } from "./component";
import { Service } from "./service";
export { render, html, Component, Service, useRef, useState, useContext };
