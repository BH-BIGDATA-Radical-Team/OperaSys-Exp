class Fcfs {
	name = new Array()
	pid = new Array()
	t_arrive = new Array()
	t_service = new Array()
	t_start = new Array()
	t_finish = new Array()
	t_round = new Array()
	t_round_vex = new Array()
	finishArray = new Array()

	constructor(arg) {
		console.log('正在创建的是： 先来先服务 （FCFS）')
	}

	init(name, t_arr, t_ser, pid) {

		this.name = name
		this.t_arrive = t_arr
		this.t_service = t_ser
		this.pid = pid

		let arr = new Array(),
			result = new Array()


		console.time("fcfs")

		for (let i = 0; i < this.name.length; i++) {
			let b = new Array();
			b[0] = this.name[i]
			b[1] = this.t_arrive[i]
			b[2] = this.t_service[i]
			arr[i] = b
		}
		arr.sort((a, b) => a[1] - b[1])

		for (let i = 0; i < this.name.length; i++) {
			let b = new Array()
			b[0] = parseFloat(Number(i == 0 ? arr[i][1] : arr[i - 1][4]).toFixed(2))
			b[1] = parseFloat(Number(arr[i][2] + b[0]).toFixed(2))
			b[2] = parseFloat(Number(b[1] - arr[i][1]).toFixed(2))
			b[3] = parseFloat(Number(b[2] / arr[i][2]).toFixed(2))

			arr[i] = arr[i].concat(b)
			this.finishArray.push(arr[i][0])
			this.t_start.push(b[0])
			this.t_finish.push(b[1])
			this.t_round.push(b[2])
			this.t_round_vex.push(b[3])
		}

		result = arr

		console.log('↓ 本算法程序用时 ↓');
		console.timeEnd("fcfs")
		return {
			resultArray: result,
			finishArray: this.finishArray
		}
	}

	showMessage() {
		console.log(`您创建了一个实例，此实例将用作演示 先来先服务算法(FCFS)`)
		console.log(`调用该实例的 INIT（）函数进行一次调度算法模拟,也可以在控制台中输入 Fcfs 查看全局变量。`)
		console.log(`例如 \nlet a = new Fcfs()\n之后在控制台键入 a 即可看到返回值`)
	}

}

class TimePiece {

	time_peice = new Number()

	name = new Array()
	pid = new Array()
	t_arrive = new Array()
	t_service = new Array()
	t_start = new Array()
	t_runin = new Array()
	t_subService = new Array()
	t_finish = new Array()
	finishArray = new Array()

	constructor(arg) {
		console.log('正在创建的是： 时间片轮转调度 （TimePiece）');
	}

	init(name, t_arr, t_ser, pid, tp) {

		this.name = name
		this.t_arrive = t_arr
		this.t_service = t_ser
		this.pid = pid
		this.time_peice = tp

		let arr = new Array(),
			result = new Array(),
			finish_num = 0,
			k = 0,
			time_counter = 0

		console.time("timepiece")

		for (let i = 0; i < this.name.length; i++) {
			let b = new Array()

			// 进程名|到达时间|服务时间

			b[0] = this.name[i]
			b[1] = this.t_arrive[i]
			b[2] = this.t_service[i]
			b[3] = false
			arr[i] = b
		}
		//将数据由到达时间排序
		arr.sort((a, b) => a[1] - b[1])

		while (finish_num < this.name.length) {
			for (let i = 0; i < this.name.length; i++) {
				let b = new Array()
				if (!arr[i][3]) {

					// Array b[] 进程名|开始时间|运行时间|剩余服务时间|结束时间
					// Array arr[][] 进程名|到达时间|服务时间|FinishStatus(true/false)

					b[0] = arr[i][0]
					b[1] = k == 0 ? arr[0][1] : result[k - 1][4]
					b[2] = arr[i][2] >= tp ? tp : arr[i][2]
					b[3] = arr[i][2] - b[2]
					b[4] = b[1] + b[2]
					if (b[3] <= 0) {
						arr[i][3] = true
						this.finishArray.push(arr[i][0])
						finish_num++
					}
					arr[i][2] -= b[2]
					result.push(b)
					this.t_start.push(b[1])
					this.t_runin.push(b[2])
					this.t_subService.push(b[3])
					this.t_finish.push(b[4])
					k++
				}

			}
		}
		console.log('↓ 本算法程序用时 ↓');
		console.timeEnd("timepiece")
		return {
			resultArray: result,
			finishArray: this.finishArray
		}
	}

	showMessage() {
		console.log(`您创建了一个实例，此实例将用作演示 时间片轮转算法(TimePiece)`);
		console.log(`调用该实例的 INIT（）函数进行一次调度算法模拟,也可以在控制台中输入 TimePiece 查看全局变量。`);
		console.log(`例如 \nlet a = new TimePiece()\n之后在控制台键入 a 即可看到返回值`);
	}

}
