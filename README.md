春季班时间表
	 报名窗口开放时间：3月4日 至 3月20日
	 任务实践学习开放时间：3月14日 至 5月3日
	 竞赛任务挑战时间：5月3日 至 5月31日
	 注：时间有可能会根据实际情况进行微调，最终以官网、微博、公众号等通知为准。
	 
**1.这个项目是IFE.FrontEnd团队的第一个热身项目。

**2.任务目标：队员协作，熟悉git,每人做一版首页和介绍

**3.截止时间：2016.3.12

//普通开启方法

forever start report.js
//输出日志和错误的开启方法

forever start -l forever.log -o out.log -e err.log report.js
//查看正在运行的程序

forever list
//终止进程

forever stop

默认为3000端口

//端口修改在app.js中的 app.set('port', process.env.PORT || 3000);
