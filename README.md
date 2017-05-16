npm install -g ionic

npm install -g cordova

cd angular2

npm install

运行：ionic serve








npm install -g cordova  # 如果没有真实设备，可以通过这个命令来安装模拟环境

ionic platform add ios # 添加ios运行支持

ionic emulate ios   # 模拟运行ios环境

ionic platform add android  # 添加Android运行环境支持

ionic run android   # 使用Android运行应用


sudo npm install -g ios-deploy --unsafe-perm=true

ionic build android -prod