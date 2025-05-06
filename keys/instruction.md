# Add in this directory your RSA Keys (You can generate these keys online also)

1. private.pem
2. public.pem

Example files are provided in the directory

## Steps to Generate RSA Keys
1. Generate a Private Key

Run the following command in your terminal to generate a private key (`private.pem`):

```shell
openssl genrsa -out private.pem 2048
```

- `genrsa`: Generates an RSA private key.
- `-out private.pem`: Specifies the output file for the private key.
- `2048`: Specifies the key size (2048 bits is a common and secure size).

2. Generate a Public Key

Run the following command to extract the public key (`public.pem`) from the private key:

```shell
openssl rsa -in private.pem -pubout -out public.pem
```

- `-in private.pem`: Specifies the input file (the private key).
- `-pubout`: Extracts the public key from the private key.
- `-out public.pem`: Specifies the output file for the public key.

#### Verify the Keys

Verify the Private Key
To check the contents of the private key:

```shell
openssl rsa -in private.pem -check
```

Verify the Public Key
To check the contents of the public key:

```shell
openssl rsa -in private.pem -pubout
```