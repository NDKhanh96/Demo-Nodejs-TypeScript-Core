# Demo Node.js TypeScript Core

This repository content demo project of nodejs using TypeScript.

` Nodejs >= 20.16.0 is Required / Yêu cầu Nodejs >= 20.16.0`


## Language / Ngôn ngữ

- [Tiếng Việt](#cài-đặt)
- [English](#setup)

## Cài đặt

Để cài đặt dự án, làm theo các bước sau:

1. Khởi tạo tệp `package.json` bằng cách chạy lệnh:
    ```
    yarn init
    ```

2. Cài đặt TypeScript như một phụ thuộc phát triển bằng cách chạy lệnh:
    ```
    yarn add -D typescript
    ```

3. Cấu hình tệp `tsconfig.json` bằng cách cài đặt gói cấu hình TypeScript được khuyến nghị:
    ```
    yarn add -D @tsconfig/recommended
    ```

4. Tạo tệp `tsconfig.json` và dán nội dung sau:
    ```json
    {
      "extends": "@tsconfig/recommended/tsconfig.json",
      "compilerOptions": {
         "removeComments": true,
         "lib": ["es2020"],
         "module": "commonjs",
         "target": "es2020"
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules"]
    }
    ```
    Bất kỳ thuộc tính nào có trong tệp `tsconfig.json` bên ngoài sẽ ghi đè lên thuộc tính tương ứng trong tệp `tsconfig.json` trong node_modules. Ví dụ, nếu tệp của node_modules có `"lib": ["es2016"]`, nó sẽ bị ghi đè thành `"lib": ["es2020"]` trong tệp bên ngoài. Nếu tệp của module có `"strict": true`, và tệp bên ngoài không có nó, tệp bên ngoài sẽ không ghi đè lên và vẫn sử dụng `"strict": true` từ tệp của node_modules.

5. Thêm định nghĩa TypeScript cho Node.js bằng cách chạy lệnh:
    ```
    yarn add -D @types/node
    ```
    Gói này cung cấp các định nghĩa TypeScript cho các module Node.js. Nếu không có nó, việc nhập các module Node.js trong TypeScript sẽ gây ra lỗi do thiếu định nghĩa kiểu.

## Hot Reload

Có hai cách để kích hoạt hot reload:

### Phương pháp 1: Sử dụng `ts-node-dev`

Để kích hoạt hot reload bằng cách sử dụng `ts-node-dev`, bạn cần cài đặt nó như một phụ thuộc phát triển bằng cách chạy lệnh:
```
yarn add -D ts-node-dev
```
Vì tùy chọn `--watch` trong Node.js không hoạt động với TypeScript và `nodemon` yêu cầu `ts-node`, do đó `ts-node-dev` là một lựa chọn tốt cho hot reload.

Tiếp theo, thêm lệnh sau vào phần `"scripts"` của tệp `package.json`:
```json
"start": "ts-node-dev --respawn --env-file=.env src/server.ts"
```
Trong lệnh này:
- Cờ `--respawn` đảm bảo rằng máy chủ tự động khởi động lại khi phát hiện thay đổi.
- Phần `--env-file=.env` chỉ ra việc sử dụng tệp `.env` cho biến môi trường.
- `src/server.ts` chỉ định tệp điểm nhập cho máy chủ của bạn.

### Phương pháp 2: Sử dụng `ts-node` và `nodemon`

Nếu bạn muốn sử dụng `nodemon` cho hot reload, bạn có thể cài đặt cả `ts-node` và `nodemon` như các phụ thuộc phát triển bằng cách chạy lệnh:
```
yarn add -D ts-node nodemon
```

Sau đó, thêm lệnh sau vào phần `"scripts"` của tệp `package.json`:
```json
"dev": "nodemon --exec 'node --env-file .env -r ts-node/register' src/server.ts"
```
Trong lệnh này:
- Phần `--env-file .env` chỉ ra việc sử dụng tệp `.env` cho biến môi trường.
- `src/server.ts` chỉ định tệp điểm nhập cho máy chủ của bạn.

### So sánh hai phương pháp, dưới đây là một số ưu điểm và nhược điểm:

Phương pháp 1 (Sử dụng `ts-node-dev`):
- Ưu điểm:
    - Dễ cài đặt và sử dụng.
    - Tự động khởi động lại máy chủ khi phát hiện thay đổi.
    - Hỗ trợ sử dụng tệp `.env` cho biến môi trường.

- Nhược điểm:
    - Có thể khởi động chậm hơn một chút so với `ts-node` và `nodemon`.

Phương pháp 2 (Sử dụng `ts-node` và `nodemon`):
- Ưu điểm:
    - Khởi động nhanh hơn so với `ts-node-dev`.
    - Cho phép linh hoạt hơn trong việc tùy chỉnh lệnh.

- Nhược điểm:
    - Yêu cầu cài đặt riêng biệt của `ts-node` và `nodemon`.

## Cấu hình ESLint

Để cấu hình ESLint, làm theo các bước sau:

1. Cài đặt ESLint (phiên bản 9.8.0) bằng cách chạy lệnh:
    ```
    yarn create @eslint/config@latest
    ```
    Nếu gặp bất kỳ lỗi nào, bạn có thể sử dụng npm thay thế:
    ```
    npm init @eslint/config@latest
    ```

    Lệnh này sẽ cài đặt các gói sau:
    - `@eslint/js` (phiên bản ^9.8.0)
    - `eslint` (phiên bản 9.x)
    - `globals` (phiên bản ^15.9.0)
    - `typescript-eslint` (phiên bản ^8.0.1)

    Nó cũng sẽ tạo một tệp cấu hình ESLint với phần mở rộng `.js`, `.cjs` hoặc `.mjs`.

2. Cài đặt định nghĩa kiểu cho việc nhập `@eslint/js` bằng cách chạy lệnh:
    ```
    yarn add -D @types/eslint__js
    ```

3. Sao chép phần rules từ tệp cấu hình ESLint của repository để bật tô sáng lỗi và định dạng khi lưu trong Visual Studio Code.

Nếu Visual Studio Code vẫn không hiển thị lỗi ESLint hoặc định dạng khi lưu sau khi hoàn thành cài đặt ESLint, hãy thử các bước sau theo thứ tự:

1. Reload Visual Studio Code.
2. Nhấp chuột phải vào mã và chọn "Format Document With..." > "ESLint", sau đó reload lại Visual Studio Code.
3. Thêm cấu hình sau vào tệp `settings.json` của workspace (file .vscode), sau đó reload lại Visual Studio Code:
    ```json
    {
         "editor.codeActionsOnSave": {
            "source.fixAll.eslint": "explicit"
         },
         "eslint.validate": [
            "javascript",
            "javascriptreact",
            "typescript",
            "typescriptreact"
         ],
         "eslint.enable": true
    }
    ```

## Setup

To set up the project, follow these steps:

1. Initialize the `package.json` file by running the command:
    ```
    yarn init
    ```

2. Install TypeScript as a development dependency by running the command:
    ```
    yarn add -D typescript
    ```

3. Configure the `tsconfig.json` file by installing the recommended TypeScript configuration package:
    ```
    yarn add -D @tsconfig/recommended
    ```

4. Create a `tsconfig.json` file and paste the following content:
    ```json
    {
      "extends": "@tsconfig/recommended/tsconfig.json",
      "compilerOptions": {
         "removeComments": true,
         "lib": ["es2020"],
         "module": "commonjs",
         "target": "es2020"
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules"]
    }
    ```
    Any attribute present in the external `tsconfig.json` file will override the corresponding attribute in the `tsconfig.json` file within the node module. For example, if the module's file has `"lib": ["es2016"]`, it will be overridden to `"lib": ["es2020"]` in the external file. If the module's file has `"strict": true`, and the external file does not have it, the external file will not override it and will still use `"strict": true` from the module's file.

5. Add TypeScript definitions for Node.js by running the command:
    ```
    yarn add -D @types/node
    ```
    This package provides TypeScript definitions for Node.js modules. Without it, importing Node.js modules in TypeScript will result in errors due to missing type definitions.

## Hot Reload

There are two ways to enable hot reload:

### Method 1: Using `ts-node-dev`

To enable hot reload using `ts-node-dev`, you need to install it as a development dependency by running the command:
```
yarn add -D ts-node-dev
```
Since the `--watch` option in Node.js does not work for TypeScript, and `nodemon` requires `ts-node`, `ts-node-dev` is a good choice for hot reload. 

Next, add the following command to the `"scripts"` section of the `package.json` file:
```json
"start": "ts-node-dev --respawn --env-file=.env src/server.ts"
```
In this command:
- `--respawn` flag ensures that the server restarts automatically when changes are detected.
- `--env-file=.env` part indicates the usage of the `.env` file for environment variables.
- `src/server.ts` specifies the entry point file for your server.

### Method 2: Using `ts-node` and `nodemon`

If you prefer to use `nodemon` for hot reload, you can install both `ts-node` and `nodemon` as development dependencies by running the command:
```
yarn add -D ts-node nodemon
```

After that, add the following command to the `"scripts"` section of the `package.json` file:
```json
"dev": "nodemon --exec 'node --env-file .env -r ts-node/register' src/server.ts"
```
In this command:
- `--env-file .env` part indicates the usage of the `.env` file for environment variables.
- `src/server.ts` specifies the entry point file for your server.

### Comparing the two methods, here are some pros and cons:

Method 1 (Using `ts-node-dev`):
- Pros:
    - Easy to set up and use.
    - Automatically restarts the server when changes are detected.
    - Supports usage of `.env` file for environment variables.

- Cons:
    - May have slightly slower startup time compared to `ts-node` and `nodemon`.

Method 2 (Using `ts-node` and `nodemon`):
- Pros:
    - Faster startup time compared to `ts-node-dev`.
    - Allows more flexibility in customizing the command.

- Cons:
    - Requires separate installation of `ts-node` and `nodemon`.

## ESLint Configuration

To configure ESLint, follow these steps:

1. Install ESLint (version 9.8.0) by running the command:
    ```
    yarn create @eslint/config@latest
    ```
    If you encounter any errors, you can use npm instead:
    ```
    npm init @eslint/config@latest
    ```

    This command will install the following packages:
    - `@eslint/js` (version ^9.8.0)
    - `eslint` (version 9.x)
    - `globals` (version ^15.9.0)
    - `typescript-eslint` (version ^8.0.1)

    It will also create an ESLint configuration file with a `.js`, `.cjs`, or `.mjs` extension.

2. Install the type definitions for the `@eslint/js` import by running the command:
    ```
    yarn add -D @types/eslint__js
    ```

3. Copy the rules section from the repository's ESLint configuration file to enable error highlighting and format on save in Visual Studio Code.

If Visual Studio Code still does not show ESLint errors or format on save after completing the ESLint setup, try the following steps in order:

1. Reload Visual Studio Code.
2. Right-click on the code and select "Format Document With..." > "ESLint", then reload Visual Studio Code.
3. Add the following configuration to the workspace's `settings.json` file, then reload Visual Studio Code:
    ```json
    {
         "editor.codeActionsOnSave": {
            "source.fixAll.eslint": "explicit"
         },
         "eslint.validate": [
            "javascript",
            "javascriptreact",
            "typescript",
            "typescriptreact"
         ],
         "eslint.enable": true
    }
    ```

