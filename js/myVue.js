const App = {
	data() {
		return {
			counter: 1,
			testCase_pid: [3112, 4315, 5241, 5661, 5683],
			testCase_name: ['进程1', '进程2', '进程3', '进程4', '进程5'],
			testCase_arriveTime: [3, 2, 4, 6, 5],
			testCase_serviceTime: [4, 5, 6, 4, 5],
			time_piece: 2,
			mainObj: {
				type: null,
				res: null,
				tips: [],
			},
			isShowTestCase: true,
		}
	},
	mounted() {
		this.InitApp()
		this.InitTestCase()
	},
	computed: {
		type_display: function() {
			return this.mainObj.type ?? "↓ 您还没有选择一种算法 ↓"
		}
	},
	methods: {
		InitApp() {
			console.log(`Vue init ${this.counter?'√':'×'}`)
		},
		InitTestCase() {
			console.log("本实验测试用例如下");
			console.log('进程名称', this.testCase_name);
			console.log('到达时间', this.testCase_arriveTime);
			console.log('服务时间', this.testCase_serviceTime);
		},
		resetTestCase() {
			let testCase_pid = [3112, 4315, 5241, 5661, 5683],
				testCase_name = ['进程1', '进程2', '进程3', '进程4', '进程5'],
				testCase_arriveTime = [3, 2, 4, 6, 5],
				testCase_serviceTime = [4, 5, 6, 4, 5],
				time_piece = 2

			this.testCase_pid = testCase_pid
			this.testCase_name = testCase_name
			this.testCase_arriveTime = testCase_arriveTime
			this.testCase_serviceTime = testCase_serviceTime
			this.time_piece = time_piece

			console.log("实验用例已重置");

		},
		insertTestCase() {
			this.testCase_pid.push(null)
			this.testCase_name.push(null)
			this.testCase_arriveTime.push(null)
			this.testCase_serviceTime.push(null)
		},
		InitFcfs(arr_name, arr_t_arrive, arr_t_service,pid) {
			let fcfs_test = new Fcfs()
			fcfs_test.showMessage()
			this.mainObj.type = "FirstComeFirstServer(FCFS) / 先来先服务调度"
			console.log(fcfs_test);
			return fcfs_test.init(arr_name, arr_t_arrive, arr_t_service,pid)
		},
		InitTimePiece(arr_name, arr_t_arrive, arr_t_service,pid) {
			let timepiece_test = new TimePiece()
			timepiece_test.showMessage()
			this.mainObj.type = "TimePiece(RR) / 时间片轮转调度"
			console.log(timepiece_test);
			return timepiece_test.init(arr_name, arr_t_arrive, arr_t_service,pid, this.time_piece)
		},
		doFcfs(arr_name, arr_t_arrive, arr_t_service,pid) {
			let flag = true
			for (let i = 0; i < pid.length; i++)
				if (pid[i] == (undefined || null)) flag = false
			for (let i = 0; i < arr_name.length; i++)
				if (arr_name[i] == (undefined || null)) flag = false
			for (let i = 0; i < arr_t_arrive.length; i++)
				if (arr_t_arrive[i] == (undefined || null)) flag = false
			for (let i = 0; i < arr_t_service.length; i++)
				if (arr_t_service[i] == (undefined || null)) flag = false

			if (flag) {
				const {
					resultArray,
					finishArray
				} = this.InitFcfs(arr_name, arr_t_arrive, arr_t_service,pid)

				console.log('算法得到的结果',{
					res: resultArray,
					fin: finishArray
				});
				this.mainObj.res = resultArray
				this.mainObj.tips = [
					"先来先服务调度算法参数构成",
					"1.上表的进程顺序按照进程进入顺序从上至下依次排列。",
					"2.进程名称 指对应时间系统分配CPU等资源给哪一个进程，在标准 PCB 结构中，该参数对应着内外标识（唯一 PId）。",
					"3.开始时间 指对应进程开始运行时在系统中对应的时间戳（相对）。",
					"4.完成时间 指对应进程完成任务时在系统中对应的时间戳（相对）。",
					"5.周转时间 指该进程在到达进程队列后需要多久才能完成任务。周转时间 = 完成时间 - 到达时间。",
					"6.带权周转时间 指作业的周转时间与系统为它提供服务的时间之比，反映作业（或进程）长短问题。带权周转时间 = 周转时间 / 服务时间。"
				]
			}else{
				window.alert("输入信息有误，请检查填写的用例信息。\n如果找不到错误建议点击用例设置中的“重置为原有测试用例”以消除错误\n\n一般引起本条警示的原因通常为：\n\t1.进程设置中有空值\n\t2.输入值过大或过小或为负值\n\t3.使用其他Js工具或语句进行阻塞")
			}
		},
		doTimePiece(arr_name, arr_t_arrive, arr_t_service,pid) {
			let flag = true
			for (let i = 0; i < pid.length; i++)
				if (pid[i] == (undefined || null)) flag = false
			for (let i = 0; i < arr_name.length; i++)
				if (arr_name[i] == (undefined || null)) flag = false
			for (let i = 0; i < arr_t_arrive.length; i++)
				if (arr_t_arrive[i] == (undefined || null)) flag = false
			for (let i = 0; i < arr_t_service.length; i++)
				if (arr_t_service[i] == (undefined || null)) flag = false
			
			if(flag){
				const {
					resultArray,
					finishArray
				} = this.InitTimePiece(arr_name, arr_t_arrive, arr_t_service,pid)
				
				console.log('算法得到的结果',{
					res: resultArray,
					fin: finishArray
				});
				this.mainObj.res = resultArray
				this.mainObj.tips = [
					"时间片轮转调度算法参数构成",
					"1.上表中的每一行对应着在系统中运行的时间片记录的相关信息，按照时间片运行顺序从上至下依次排列。",
					"2.进程名称 指对应时间片下系统分配CPU等资源给哪一个进程，在标准 PCB 结构中，该参数对应着内外标识（唯一 PId）。",
					"3.开始时间 指对应时间片开始运行时在系统中对应的时间戳（相对）。",
					"4.运行时间 指该进程在此时间片中运行的时间。",
					"5.剩余服务时间 指该进程在除去当前时间片的任务调度之后，需要多久才能完成任务。",
					"6.结束时间 指对应时间片结束运行时在系统中对应的时间戳（相对）。"
				]
			}else{
				window.alert("输入信息有误，请检查填写的用例信息。\n如果找不到错误建议点击用例设置中的“重置为原有测试用例”以消除错误\n\n一般引起本条警示的原因通常为：\n\t1.进程设置中有空值\n\t2.输入值过大或过小或为负值\n\t3.使用其他Js工具或语句进行阻塞")
			}
		}
	}
};
Vue.createApp(App).mount('#app')
