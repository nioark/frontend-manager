import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themes: Record<string, string>[] = [
    {
      '--primary-color': '#ade8f4',
      '--secondary-color': '#caf0f8',
      '--background-color': "#EDF8F3",
      '--background-text-color': "#00000",
      '--accent-color': '#192ae1',
      '--text-color': "1c1a03",
      '--text-color-background': "000000"
    },
    // {
    //   '--primary-color': '#a26769',
    //   '--secondary-color': '#d5b9b2',
    //   '--background-color': "#ece2d0",
    //   '--accent-color': '#3772ff',
    //   '--text-color': "#49111c",
    //   '--text-color-background': "000000"
    // },
    {
      '--primary-color': '#003554',
      '--secondary-color': '#051923',
      '--background-color': "#e7ecef",
      '--background-text-color': "#00000",
      '--accent-color': '#00a6fb',
      '--text-color': "#bcb8b1",
      '--text-color-background': "000000"
    },
    // {
    //   '--primary-color': '#208b3a',
    //   '--secondary-color': '#2dc653',
    //   '--background-color': "#b7efc5",
    //   '--accent-color': '#a8d5e2',
    //   '--text-color': "#1e2f23",
    //   '--text-color-background': "000000"
    // },
  ];

  themeIndex : number = 0;


  constructor() {

  }

  setColors(theme: Record<string, string>){
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  }

  setThemeIndex(index  : number){
    this.setColors(this.themes[index]);
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
