from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(1, 3)  # tiempo de espera entre solicitudes

    @task
    def submit_form(self):
        # Define el endpoint al que quieres enviar el formulario
        endpoint = "/registro"
        # Define los datos del formulario
        data = {
            "nombre": "Juan",
            "apellido": "Diego",
            "direccion": "prensa",
            "telefono": "0939737694",
            "email": "juandiegojd252@gmail.com",
            "contrasena": "**********"
        }
        # Realiza una solicitud HTTP POST al endpoint definido con los datos del formulario
        response = self.client.post(endpoint, json=data)
        # Verifica si la respuesta fue exitosa
        if response.status_code == 200:
            # Registra el éxito de la solicitud en Locust
            self.environment.events.request_success.fire(
                request_type="POST",
                name=endpoint,
                response_time=response.elapsed.total_seconds() * 1000,
                response_length=len(response.content),
            )
        else:
            # Registra el fallo de la solicitud en Locust
            self.environment.events.request_fail.fire(
                request_type="POST",
                name=endpoint,
                response_time=response.elapsed.total_seconds() * 1000,
                exception=response.exception,
            )
