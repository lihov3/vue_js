var PeopleView = new Vue({
	el: '#peopleView',
	data: {
		sort_by: 'age',
		sort: 'up',
		id: 1,
		id_on_save: null,
		id_new: 7,
		edit: { 
			id: null,
			photo: null,
			FName: null,
			age: null,
			job: null
		},
		dataPeolpes: [
			{ id:1, photo:'https://cdn.maximonline.ru/28/f8/71/28f871cd2aefb92c8c41e108797cde7b/1024x1024_0xac120002_10429326581550233820.jpg',	FName: 'Игрина Петровна', age: 15, job: 'управляющая'},
			{ id:2, photo:'https://u.kanobu.ru/editor/images/79/a4d507cb-457f-4095-9c21-7a509654a027.jpg', FName: 'Яна Александровна', age: 23, job: 'Маркетолог'},
			{ id:3, photo:'https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png', FName: 'Давид Александрович', age: 25, job: 'IT-специалист'},
			{ id:4, photo:'https://cdn.maximonline.ru/0a/dd/68/0add6885352bd545197842b6b82ba44a/1024x1024_0xac120002_17152158281550233735.jpg', FName: 'Александр Богданович', age: 32, job: 'Управляющий отделом IT'},
			{ id:5, photo:'https://cs7.pikabu.ru/post_img/big/2019/02/20/9/155067750822610153.jpg', FName: 'Аркадий Gетрович', age: 19, job: 'Курьер'},
			{ id:6, photo:'https://do-slez.com/uploads/posts/2019-03/1552931836_ai-image-generation-fake-faces-people-nvidia-5c18b20b472c2__700.jpg', FName: 'Данил Вадимович', age: 18, job: 'Дизайнер'}
		],
	},
	computed: {
		data: function() {
			var sort_by = this.sort_by,
				sort = this.sort;
			return this.dataPeolpes.sort((a, b) => {
				if (a[sort_by] > b[sort_by]) {
					return sort == 'up' ? 1 : -1;
				} else if (a[sort_by] < b[sort_by]) {
					return sort == 'up' ? -1 : 1;
				} else {
					return 0
				}
			});
		},
		returnInfo: function() { 
			var i = this.find(this.id);
			return this.data[i];
		},
	},
	watch: {
		id_on_save: function () {
			if (this.id_on_save !== null) {
				var i = this.find(this.id_on_save);
				for (key in this.edit) {
					this.edit[key] = this.dataPeolpes[i][key];
				}
			}
		}
	},
	methods: {
		stepid: function (stepItt) {
			var len = this.dataPeolpes.length;
				step = this.find(this.id) + stepItt;
			if (step == len) {
				step = 0;
			} else if (step < 0) {
				step = len - 1;
			}
			this.id = this.dataPeolpes[step].id;
		},
		save: function () {
			var data = { 
				id: null,
				photo: null,
				FName: null,
				age: null,
				job: null
			};
			for (var key in data) {
				data[key] = this.edit[key];
			}
			if (this.id_on_save === null) {
				data.id = this.id_new++;
				this.dataPeolpes.push(data);
			} else {
				Vue.set(this.dataPeolpes, this. find(this.id_on_save), data);
				this.id_on_save = null;
			}	
			for (key in this.edit) {
				this.edit[key] = null;
			}
		},
		del: function (id) {
			if (confirm('Вы действительно хотите удалить?')) {
				var i = this.find(id);
				var len = this.dataPeolpes.length;
				if (this.id == id) {
					if ((i === (len - 1)) && len > 1) {
						this.id = this.dataPeolpes[i - 1].id;
					} else if (len <= 1) {
						this.id = null;
					} else {
						this.id = this.dataPeolpes[i + 1].id;
					}
				}
				this.dataPeolpes.splice(i, 1);
			}
		},
		find: function (id) {
			for (var i = 0; i < this.dataPeolpes.length; i++) {
				if (this.dataPeolpes[i].id == id) {
					return i;
				}
			}
		},

	},
})





