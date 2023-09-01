.PHONY:

jwt:
	rm -f jwt_key/jwt.key && rm -f jwt_key/jwt.key.pub
	ssh-keygen -t rsa -P "" -b 4096 -m PEM -f jwt_key/jwt.key
	openssl rsa -in jwt_key/jwt.key -pubout -outform PEM -out jwt_key/jwt.key.pub