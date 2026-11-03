# Our Works

- **URL**: https://migeventsandproductions.com/our-works/
- **Type**: page
- **Date**: 2026-07-15T19:44:53

---

# Our Works

- 
											[

											Home
											](#)

- 

										Our Works

July 15, 2026

## Themed Birthday Bash for Sophia – Miami

July 15, 2026

## Themed Birthday Bash for Sophia – Miami

July 15, 2026

## Themed Birthday Bash for Sophia – Miami

			Happy Clients			
				
				0
				+

			Events Completed			
				
				0
				+

			Years of Experience			
				
				0
				+

			Satisfaction Rate			
				
				0
				%

- 

										Talk to Our Event Experts

# Lets Make Your Event Unforgettable

									From concept to execution, we bring creativity, precision, and seamless planning together to create events that leave a lasting impression. Let’s turn your vision into an experience worth remembering.

					[Contact Us](https://migeventsandproductions.com/contact-us/)				

### Your Dream Event Starts Here

Start Planning Your Event

			function controls_data (value){
				let currentWrapper = "mf-response-props-id-668";
				let currentEl = document.getElementById(currentWrapper);
				
				return currentEl ? currentEl.dataset[value] : false
			}

			let is_edit_mode = '' ? true : false;
			let message_position = controls_data('messageposition') || 'top';

			let message_successIcon = controls_data('successicon') || '';
			let message_errorIcon = controls_data('erroricon') || '';
			let message_editSwitch = controls_data('editswitchopen') === 'yes' ? true : false;
			let message_proClass = controls_data('editswitchopen') === 'yes' ? 'mf_pro_activated' : '';
			
			let is_dummy_markup = is_edit_mode && message_editSwitch ? true : false;

			return html`

					${is_dummy_markup ? message_position === 'top' ?  props.ResponseDummyMarkup(message_successIcon, message_proClass) : '' : ''}
					${is_dummy_markup ? ' ' :  message_position === 'top' ? props.SubmitResponseMarkup`${parent}${state}${message_successIcon}${message_errorIcon}${message_proClass}` : ''}

					${html`

					${ parent.decodeEntities(` Name`) } 					*

			{
												parent.activateValidation({"message":"This field is required.","minLength":1,"maxLength":"","type":"none","required":true,"expression":"null"}, el)
					}}
								/>

							`}
					/>

					${ parent.decodeEntities(`Phone Number`) } 					*

			{
												parent.activateValidation({"message":"This field is required.","minLength":1,"maxLength":"","type":"none","required":true,"expression":"null"}, el)
					}}
								/>

							`}
					/>

					${ parent.decodeEntities(`Email Address`) } 					*

			 parent.activateValidation({"message":"This field is required.","emailMessage":"Please enter a valid Email address","minLength":1,"maxLength":"","type":"none","required":true,"expression":"null"}, el)}
							/>

						`}
			/>

					${ parent.decodeEntities(`Location`) } 					*

			{
												parent.activateValidation({"message":"This field is required.","minLength":1,"maxLength":"","type":"none","required":true,"expression":"null"}, el)
					}}
								/>

							`}
					/>

					${ parent.decodeEntities(`Message`) } 					*

			 parent.activateValidation({"message":"This field is required.","minLength":1,"maxLength":"","type":"none","required":true,"expression":"null"}, el)}
								>

							`}
					/>

											 parent.activateValidation({"message":"reCAPTCHA is required.","required":true}, el)}
							/>

						`} />

					${ parent.decodeEntities(`Send Message`) } 

							`}

					${is_dummy_markup ? message_position === 'bottom' ? props.ResponseDummyMarkup(message_successIcon, message_proClass) : '' : ''}
					${is_dummy_markup ? ' ' : message_position === 'bottom' ? props.SubmitResponseMarkup`${parent}${state}${message_successIcon}${message_errorIcon}${message_proClass}` : ''}

			`