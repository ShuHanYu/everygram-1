<template>
	<div class="login">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-6 col-xl-5 d-none d-lg-block">
					<div class="login__banner">
						<h1 class="login__title">Start managing your gears with Everygram</h1>
						<img src="static/images/illustration/login.png" alt="" class="login__illustration">
					</div>
				</div>
				<div class="col-md-8 col-lg-6 col-xl-5 offset-xl-1 mx-auto">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>
