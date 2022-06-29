Vue.createApp({
	data: () => ({
		showInstructions: true,
		currentClimber: null,
		idCode: '',
		isLoading: false,
	}),
	computed: {
    // a computed getter
    isSubmitDisabled() {
		console.log(this.idCode.length);
			return !this.idCode || this.idCode.length !== 11
		}
	},
	created() {

	},
	methods: {
		fetchResult: function (id) {
			return fetch(`/api/check?id=${id}`)
				.then((response) => {
					if (!response.ok) {
						this.currentClimber = null;
						return;
					}
					return response.json();
				});
		},
		submit: function () {
			if (!this.idCode) return;
			this.showInstructions = false;
			this.isLoading = true;
			this.fetchResult(this.idCode)
				.then((data) => {
					if (!data) return;
					this.currentClimber = data.success ? data : null;
				})
				.finally(()=>{this.isLoading = false;});
		},
		goBack: function () {
			this.currentClimber = null;
		}
	}
}).mount('#app');
