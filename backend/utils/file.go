package util

import (
	"encoding/base64"
	"os"
)

func ReadPrivateKey() (string, error) {
	/*
	* The os.ReafFile function reads the whole file into a string.
	* This function is convenient but should not be used with very large files.
	 */
	pwd, err := os.Getwd()
	if err != nil {
		return "", err
	}
	f, err := os.ReadFile(pwd + "/keys/private_key.pem")
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(f), nil
}

func ReadPublicKey() (string, error) {
	/*
	* The os.ReafFile function reads the whole file into a string.
	* This function is convenient but should not be used with very large files.
	 */
	pwd, err := os.Getwd()
	if err != nil {
		return "", err
	}
	f, err := os.ReadFile(pwd + "/keys/public_key.pub")
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(f), nil
}
