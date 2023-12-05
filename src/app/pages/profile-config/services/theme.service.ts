import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themes: Record<string, string>[] = [
    {
      '--primary-color': 'rgb(170, 175, 236)',
      '--secondary-color': '#d0f4de',
      '--background-color': "#EDF8F3",
      '--accent-color': '#192ae1',
      '--text-color': "1c1a03"
    },
    {
      '--primary-color': '#a26769',
      '--secondary-color': '#d5b9b2',
      '--background-color': "#ece2d0",
      '--accent-color': '#3772ff',
      '--text-color': "#49111c"
    },
    {
      '--primary-color': '#003554',
      '--secondary-color': '#051923',
      '--background-color': "#778da9",
      '--accent-color': '#00a6fb',
      '--text-color': "#bcb8b1"
    },
    {
      '--primary-color': '#208b3a',
      '--secondary-color': '#2dc653',
      '--background-color': "#b7efc5",
      '--accent-color': '#a8d5e2',
      '--text-color': "#1e2f23"
    },
  ];

  themeIndex : number = 0;


  constructor() {

  }

  setColors(theme: Record<string, string>){
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  }

  setTheme(){
    const theme = localStorage.getItem("theme");
    if(theme){
      this.themeIndex = JSON.parse(theme)["index"];
      this.setColors(this.themes[this.themeIndex]);
    }
    else{
      localStorage.setItem("theme", JSON.stringify({"index": this.themeIndex}));
      this.setColors(this.themes[this.themeIndex]);
    }

  }

  nextTheme(){
    this.themeIndex = (this.themeIndex + 1) % this.themes.length;
    localStorage.setItem("theme", JSON.stringify({"index": this.themeIndex}));
    this.setColors(this.themes[this.themeIndex]);
  }
}
