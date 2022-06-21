export type TokenFaucet = {
  "version": "0.1.0",
  "name": "token_faucet",
  "instructions": [
    {
      "name": "initializeTokenFaucet",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenFaucet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "decimals",
          "type": "u8"
        },
        {
          "name": "mintAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "tokenSip",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenFaucet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "tokenFaucet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintedSupply",
            "type": "u64"
          },
          {
            "name": "lastMinted",
            "type": "i64"
          },
          {
            "name": "mintInterval",
            "type": "u64"
          },
          {
            "name": "mintAmount",
            "type": "u64"
          },
          {
            "name": "tokenFaucetBump",
            "type": "u8"
          },
          {
            "name": "tokenMintBump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const IDL: TokenFaucet = {
  "version": "0.1.0",
  "name": "token_faucet",
  "instructions": [
    {
      "name": "initializeTokenFaucet",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenFaucet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "decimals",
          "type": "u8"
        },
        {
          "name": "mintAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "tokenSip",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenFaucet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "tokenFaucet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintedSupply",
            "type": "u64"
          },
          {
            "name": "lastMinted",
            "type": "i64"
          },
          {
            "name": "mintInterval",
            "type": "u64"
          },
          {
            "name": "mintAmount",
            "type": "u64"
          },
          {
            "name": "tokenFaucetBump",
            "type": "u8"
          },
          {
            "name": "tokenMintBump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
