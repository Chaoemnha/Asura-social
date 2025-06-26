# Social network for ASURA Community

## Technologies stack

-NodeJS
-MongoDB
-Express
-TypeScript

## Command remembers

- Open terminal command windows: Ctrl + `
- npm/yarn init
- git init
- git commit -m "Initial commit"
- git add \*
- git config --global user.name "Chaoemnha"
- git config --global user.email luannguyentm99@gmail.com
- git config --global core.editor "'D:\Program Files\Notepad++\notepad++.exe' -multiInst -nosession"
  Hiện tại nó là repository ta vẫn lm vc bth nhưng nó sẽ ko tồn tại trên github, ta chx push code lên => h ta sẽ add
- git remote add origin https://github.com/Chaoemnha/Asura-social.git
- git push -u origin master //-u là upstream, nghĩa là master này sẽ kết nối với master trên kia

### ESLINT

yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

### Husky

Có thể cài thêm husky để yêu cầu người dùng phải chạy lệnh, sửa lỗi thì mới được commit code

### Heroku

Gặp bất cứ thắc mắc vấn đề gì, xem https://devcenter.heroku.com/articles/getting-started-with-nodejs
Tôi đã bỏ webpack vì gặp vấn đề deploy với heroku, nó vẫn chạy được bình thường ở local nếu bạn muốn bạn vẫn có thể thêm chúng vào và thực thi, đây là các lệnh tôi tạm thời loại bỏ trong package.json>scripts backend:
,
"build": "webpack",
"runn": "cross-env NODE_ENV=development nodemon dist/server.js",
"start": "cross-env NODE_ENV=development node dist/server.js"

### Lession 10

- tsc --init
  https://www.npmjs.com/package/winston
  https://www.npmjs.com/package/class-validator

### Reference

- http://expressjs.com/en/resources/middleware/morgan.html
- https://www.typescriptlang.org/tsconfig
- https://github.com/winstonjs/winston
- https://www.npmjs.com/package/bcryptjs
- https://www.npmjs.com/package/class-validator
