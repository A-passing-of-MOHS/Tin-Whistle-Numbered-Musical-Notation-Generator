const PROCESS = require('child_process');
// 执行cmd命令，打包构建

exports.runCmd  = function (cmd){
        return new Promise((resolve, reject) => {
            // 使用给定的 command 和 args 中的命令行参数衍生新进程。 如果省略，args 默认为空数组
            const ls = PROCESS.spawn(cmd, { shell: true });
            var cmdMessage = '';
            ls.stdout.on('data', (data) => {
                console.log(`start ---`, data);
                if (!data) {
                    reject(` error1 : ${data}`);
                } else {
                    cmdMessage = data.toString();
                }
            });

            ls.stderr.on('data', (data) => {
                console.log(data.toString())
            });


            ls.on('close', (data) => {
                console.log(` close ---`, data);
                if (data) {
                    reject(` error2 ! ${data}`);
                } else {
                    console.log(` success !`);
                    resolve(cmdMessage);
                }
            });
        })
    }
