package com.speechpro.empbase.empbase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class EmpbaseApplication {

	@Bean(name="migrationRestTemplate")
	public RestTemplate migrationRestTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}


	public static void main(String[] args) {
		SpringApplication.run(EmpbaseApplication.class, args);
	}
}
