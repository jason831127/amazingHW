說明

### 需求規範

- 無須實作前端畫面
- 無須實作Email和手機的驗證流程
- 可使用任意語言撰寫
- 以上兩種註冊方式，請使用同一隻API完成，路徑: **/v1/user/register**
- 請求和回應格式皆使用JSON



範例啟動 
docker-compose up --build 

測試方式
npm run test

由於mail server 設定檔為假資料，所以test case不會發送email，可以接用更改package.json的系統參數(加上DISABLE_TESTCASE feature toggle)或者拔掉test case sendBody.test來讓發送mail機制work


其它說明
翻譯檔位於 src/lib/locales/common/*
錯誤代碼翻譯檔位於 src/lib/locales/errorCode/*
環境設定檔位於config/index 並根據開發環境決定吃哪個設定檔(或者改吃雲端config 例:firebase.remoteConfig)
錯誤情境的部分我沒有加上確認密碼不正確，因為我認為這個功能應該在前端實作，後端API只會收到輸入正確的密碼，email 和 手機分別有用 joi及regex做簡單的檢查。
