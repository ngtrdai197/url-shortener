.PHONY:

jwt:
	rm -rf jwt_key && mkdir jwt_key
	ssh-keygen -t rsa -P "" -b 4096 -m PEM -f jwt_key/jwt.key
	openssl rsa -in jwt_key/jwt.key -pubout -outform PEM -out jwt_key/jwt.key.pub