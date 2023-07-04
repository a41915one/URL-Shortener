## URL-Shortener

![image](https://github.com/a41915one/URL-Shortener/blob/main/URL-Shortener.png?raw=true)
功能描述(features)

+ 網站能將使用者提供的網址重新編成server加5碼隨機碼的網址
+ 輸入網址
  + 產出新網址
  + 顯示新舊網址
  + 複製新網址按鈕
  + 新網址能導到原網址
  + 同樣的網址會產出同樣的短網址



## 環境建置與需求 (prerequisites)

| Option | Description |
| ------ | ----------- |
| Node.js   | @14.16.0 |
| express | @4.18.2 |
| express-handlebars | @3.0.0 |
| bootstrap | @5.1.3 |
| mongoose | @7.3.1 |
| body-parser | @1.20.2 |


安裝與執行步驟(installation and execution)

1. 請先確認有安裝node.js 與 npm
2. 將此專案clone到本地
3. 在終端機上安裝express
```
npm install express@4.18.2
```
4. 在終端機上安裝express-handlebars，輸入 
```
npm i express-handlebars@3.0.0
```
5. 在終端機上安裝mongoose，輸入
```
npm i express-mongoose@7.3.1
```

6. 在終端機上啟動伺服器，輸入
```
npm run start
```

7. 終端機顯示以下字樣，表示成功啟動
```
App is listening on http://localhost:3000
```
