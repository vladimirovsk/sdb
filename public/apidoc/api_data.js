define({ "api": [
  {
    "type": "get",
    "url": "/api/admin/staking/fetch",
    "title": "fetch",
    "group": "admin_staking",
    "name": "fetch",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/staking.js",
    "groupTitle": "admin_staking"
  },
  {
    "type": "put",
    "url": "/admin/change-password",
    "title": "change-password",
    "group": "admin",
    "name": "change-password",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "oldPassword",
        "description": ""
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "newPassword",
        "description": ""
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/index.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/admin/create",
    "title": "create",
    "group": "admin",
    "name": "create",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "email",
        "description": ""
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "password",
        "description": ""
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/index.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/admin/fetch",
    "title": "fetch",
    "group": "admin",
    "name": "fetch",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/index.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/admin/login",
    "title": "login",
    "name": "login",
    "group": "admin",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "email",
        "description": ""
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "password",
        "description": ""
      }
    ],
    "version": "0.0.0",
    "filename": "routes/admin/index.js",
    "groupTitle": "admin"
  },
  {
    "type": "put",
    "url": "/admin/set-permission",
    "title": "set-permission",
    "group": "admin",
    "name": "set-permission",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "email",
        "description": ""
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "create_read_only",
        "description": "<p>DefaultValues=false</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "create_update",
        "description": "<p>DefaultValues=false</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "remove_read_only",
        "description": "<p>DefaultValues=false</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "remove_update",
        "description": "<p>DefaultValues=false</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "setting_read_only",
        "description": "<p>DefaultValues=false</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "setting_update",
        "description": "<p>DefaultValues=false</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "token_read_only",
        "description": "<p>DefaultValues=false</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "token_update",
        "description": "<p>DefaultValues=false</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/index.js",
    "groupTitle": "admin"
  },
  {
    "type": "put",
    "url": "/admin/set-type-admin",
    "title": "set-type-admin",
    "group": "admin",
    "name": "set-type-admin",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "email",
        "description": ""
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "typeAdmin",
        "description": "<p>DefaultValues = 1 0-moderator 1- admin, 2- editor, 3-*moderator ask documentation</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/index.js",
    "groupTitle": "admin"
  },
  {
    "type": "put",
    "url": "/admin/set-wallet-admin",
    "title": "set-wallet-admin",
    "group": "admin",
    "name": "set-wallet-admin",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "email",
        "description": ""
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "wallet",
        "description": ""
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/index.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/auth/createToken",
    "title": "Create Token",
    "group": "auth",
    "name": "createToken",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "invoice",
        "defaultValue": "0x33295b5De6e00d45f68a3a7712cb16940bFebEfE",
        "description": ""
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tokenRefresh",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "exp",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "wallet_id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/api/auth/refreshToken",
    "title": "Refresh token",
    "group": "auth",
    "name": "refreshToken",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\"Authorization\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZvaWNlIjoiMHgzMzI......\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "auth"
  },
  {
    "type": "get",
    "url": "/api/blockchain/add-liquidity",
    "title": "add-liquidity",
    "group": "blockchain",
    "name": "add-liquidity",
    "description": "<p>for testing add-liquidity function in backend</p>",
    "version": "0.0.0",
    "filename": "routes/blockchain.js",
    "groupTitle": "blockchain"
  },
  {
    "type": "get",
    "url": "/api/blockchain/approve-token",
    "title": "approve-token",
    "group": "blockchain",
    "name": "approve-token",
    "description": "<p>approve-token in backend</p>",
    "version": "0.0.0",
    "filename": "routes/blockchain.js",
    "groupTitle": "blockchain"
  },
  {
    "type": "get",
    "url": "/api/blockchain/create-pair",
    "title": "create-pair",
    "group": "blockchain",
    "name": "create-pair",
    "description": "<p>for testing create-pair function in backend</p>",
    "version": "0.0.0",
    "filename": "routes/blockchain.js",
    "groupTitle": "blockchain"
  },
  {
    "type": "get",
    "url": "/api/blockchain/home-info",
    "title": "home-info",
    "group": "blockchain",
    "name": "home-info",
    "description": "<p>Output info from home page SDB</p>",
    "version": "0.0.0",
    "filename": "routes/blockchain.js",
    "groupTitle": "blockchain"
  },
  {
    "type": "get",
    "url": "/api/blockchain/swap-tokens-tokens",
    "title": "swap-tokens-tokens",
    "group": "blockchain",
    "name": "swap-tokens-tokens",
    "description": "<p>for testing swap function in backend</p>",
    "version": "0.0.0",
    "filename": "routes/blockchain.js",
    "groupTitle": "blockchain"
  },
  {
    "type": "get",
    "url": "/api/admin/exchanges/fetch",
    "title": "fetch",
    "group": "exchanges",
    "name": "fetch",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "limit",
        "description": "<p>DefaultValue =15</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "current_page",
        "description": "<p>DefaultValue=1</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization:",
            "description": "<p>&quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&quot;</p>"
          }
        ]
      }
    },
    "description": "<p>Selecting All Transaction Records</p>",
    "version": "0.0.0",
    "filename": "routes/admin/exchanges.js",
    "groupTitle": "exchanges"
  },
  {
    "type": "get",
    "url": "/api/admin/exchanges/find",
    "title": "find:wallet",
    "group": "exchanges",
    "name": "find",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>DefaultValue = 15</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current_page",
            "description": "<p>DefaultValue = 1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wallet",
            "defaultValue": "0x33295b5De6e00",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization:",
            "description": "<p>&quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&quot;</p>"
          }
        ]
      }
    },
    "description": "<p>Selecting All Transaction Records</p>",
    "version": "0.0.0",
    "filename": "routes/admin/exchanges.js",
    "groupTitle": "exchanges"
  },
  {
    "type": "get",
    "url": "/api/contract/calc-liquidity",
    "title": "calc-liquidity",
    "group": "pair",
    "name": "calc-liquidity",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token0",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token1",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amountIn",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "get",
    "url": "/api/contract/calc-swap",
    "title": "calc-swap",
    "group": "pair",
    "name": "calc-swap",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token0",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token1",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amountIn",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "get",
    "url": "/api/contract/calc-token",
    "title": "calc-token",
    "group": "pair",
    "name": "calc-token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "get",
    "url": "/api/contract/fetch-all-pairs",
    "title": "fetch-all-pairs",
    "description": "<p>get list pairs from admin, all status</p>",
    "name": "fetch-all-pair",
    "group": "pair",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "current_page",
        "defaultValue": "1",
        "description": ""
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "limit",
        "defaultValue": "15",
        "description": ""
      },
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "address",
        "description": ""
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "get",
    "url": "/api/contract/fetch-pairs",
    "title": "fetch-pairs:address",
    "description": "<p>get list pairs from clients, only status = true When address parameter, information on a specific pair is selected</p>",
    "name": "fetch-pair",
    "group": "pair",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Optional parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current_page",
            "defaultValue": "1",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "defaultValue": "15",
            "description": ""
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "address",
        "description": ""
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "get",
    "url": "/api/contract/fetch-pair-history-day",
    "title": "fetch-pair-history-day",
    "group": "pair",
    "name": "fetch-pair-history-day",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pair",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current_page",
            "defaultValue": "1",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "defaultValue": "15",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "get",
    "url": "/api/contract/fetch-pair-history-hour",
    "title": "fetch-pair-history-hour",
    "group": "pair",
    "name": "fetch-pair-history-hour",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pair",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current_page",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "defaultValue": "15",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "get",
    "url": "/api/contract/find-pairs",
    "title": "find-pairs",
    "group": "pair",
    "name": "find-pairs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current_page",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "defaultValue": "15",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "put",
    "url": "/api/contract/info-lp-token",
    "title": "info-lp-token",
    "description": "<p>Info from lp tokens from contracts</p>",
    "name": "info-lp-token",
    "group": "pair",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "put",
    "url": "/api/contract/pair-edit-params",
    "title": "pair-edit-params",
    "description": "<p>Set params swap snd earn from pair  staking = true|false</p>",
    "name": "pair-edit-params",
    "group": "pair",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "address",
        "description": "<p>=&quot;address pair&quot;</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "swap",
        "description": "<p>= 0.5</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "earn",
        "description": "<p>= 0.5</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "put",
    "url": "/api/contract/pair-set-staking",
    "title": "pair-set-staking",
    "description": "<p>Set status staking = true|false</p>",
    "name": "pair-set-staking",
    "group": "pair",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "address",
        "description": "<p>=&quot;address pair&quot;</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": true,
        "field": "staking",
        "description": "<p>=false</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "put",
    "url": "/api/contract/pair-set-status",
    "title": "pair-set-status",
    "description": "<p>Set status status = true|false</p>",
    "name": "pair-set-status",
    "group": "pair",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "address",
        "description": "<p>=&quot;address pair&quot;</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": true,
        "field": "status",
        "description": "<p>=true</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "get",
    "url": "/api/contract/select-token-from-pair",
    "title": "select-token-from-pair",
    "group": "pair",
    "name": "select-token-from-pair",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "tokenIn",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Selecting a list of token addresses that are paired with the tokenIn</p>",
    "version": "0.0.0",
    "filename": "routes/pairs.js",
    "groupTitle": "pair"
  },
  {
    "type": "get",
    "url": "/api/staking/fetch",
    "title": "fetch",
    "description": "<p>staking default 0., staking=1 only staking pair</p>",
    "group": "staking",
    "name": "fetch",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "staking",
        "description": ""
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": [\n        {\n            \"id\": 3,\n            \"code\": \"BMW/AMD\",\n            \"pair\": \"0xBD03D753C6295c18c3B822CE7663536F15d34B20\",\n            \"token0\": \"0x3Cfa1eF60B81C9196E22337D494ED0aC9eb5Cba5\",\n            \"token1\": \"0x650ec7bB36C924EdFB0C18C8d8C1A1FCa50e83C2\",\n            \"tvl\": 4.585751544613865e+23,\n            \"apr\": 0,\n            \"earn_amount\": 2.72e+33,\n            \"staking\": 1,\n            \"status\": 1,\n            \"active\": 1,\n            \"token0_code\": \"BMW\",\n            \"token1_code\": \"AMD\",\n            \"symbol\": \"SDB LP\",\n            \"image0\": \"https://wtgazhty2ter.corp.merehead.xyz/api/static/image/tokens/WEX.png\",\n            \"image1\": \"https://wtgazhty2ter.corp.merehead.xyz/api/static/image/tokens/ALPACA.png\"\n        }\n    ]\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/staking.js",
    "groupTitle": "staking"
  },
  {
    "type": "get",
    "url": "/api/contract/fetch-all-tokens",
    "title": "fetch-all-tokens",
    "description": "<p>get list tokens from admin, all token status</p>",
    "group": "token",
    "name": "fetch-all-tokens",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "current_page",
        "defaultValue": "1",
        "description": ""
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "limit",
        "defaultValue": "15",
        "description": ""
      },
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "address",
        "description": ""
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tokens.js",
    "groupTitle": "token"
  },
  {
    "type": "get",
    "url": "/api/contract/fetch-token-history-day",
    "title": "fetch-token-history-day",
    "group": "token",
    "name": "fetch-token-history-day",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "current_page",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "limit",
            "defaultValue": "15",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tokens.js",
    "groupTitle": "token"
  },
  {
    "type": "get",
    "url": "/api/contract/fetch-token-history-hour",
    "title": "fetch-token-history-hour",
    "group": "token",
    "name": "fetch-token-history-hour",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "current_page",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "limit",
            "defaultValue": "15",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tokens.js",
    "groupTitle": "token"
  },
  {
    "type": "get",
    "url": "/api/contract/fetch-tokens",
    "title": "fetch-tokens",
    "description": "<p>get list tokens from clients, only status = true</p>",
    "group": "token",
    "name": "fetch-tokens",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "current_page",
        "defaultValue": "1",
        "description": ""
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "limit",
        "defaultValue": "15",
        "description": ""
      },
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "address",
        "description": ""
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tokens.js",
    "groupTitle": "token"
  },
  {
    "type": "get",
    "url": "/api/contract/find-tokens",
    "title": "find-tokens",
    "group": "token",
    "name": "find-tokens",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "current_page",
            "defaultValue": "1",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "limit",
            "defaultValue": "15",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "name",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tokens.js",
    "groupTitle": "token"
  },
  {
    "type": "put",
    "url": "/api/contract/token-set-status",
    "title": "token-set-status",
    "description": "<p>Set status active = true|false</p>",
    "name": "token-set-status",
    "group": "token",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "address",
        "defaultValue": "address token",
        "description": ""
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "status",
        "description": ""
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    status: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad request\n{\n    \"err\": \"Dont fount address token 0xc3142810057713BB7651240C86671c7966Be75fd0\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tokens.js",
    "groupTitle": "token"
  },
  {
    "type": "post",
    "url": "/api/transaction/addTransaction",
    "title": "addTransaction",
    "description": "<p>Add manual transaction from Swap and addLiquidity</p>",
    "group": "transaction",
    "name": "addTransaction",
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "pairAddress",
        "description": "<p>&quot;&quot;</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "walletAddress",
        "description": "<p>&quot;&quot;</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "method",
        "description": "<p>&quot;Swap/addLiquidity&quot;</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "hash",
        "description": "<p>&quot;hash transaction&quot;</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "block_number",
        "description": "<p>&quot;Number block in Blockchain&quot;</p>"
      },
      {
        "group": "Query",
        "type": "Boolean",
        "optional": false,
        "field": "status",
        "description": "<p>DefaultValues=true</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization:",
            "description": "<p>&quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/transaction.js",
    "groupTitle": "transaction"
  },
  {
    "type": "get",
    "url": "/api/transaction/fetch",
    "title": "fetch",
    "group": "transaction",
    "name": "fetch",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "limit",
        "description": "<p>DefaultValue =15</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "current_page",
        "description": "<p>DefaultValue=1</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization:",
            "description": "<p>&quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&quot;</p>"
          }
        ]
      }
    },
    "description": "<p>Selecting All Transaction Records</p>",
    "version": "0.0.0",
    "filename": "routes/transaction.js",
    "groupTitle": "transaction"
  },
  {
    "type": "get",
    "url": "/api/transaction/find-from",
    "title": "find-from:address",
    "description": "<p>Filtering record transaction from field 'from' from = you wallet</p>",
    "group": "transaction",
    "name": "find-from",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>DefaultValue = 15</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current_page",
            "description": "<p>DefaultValue = 1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "defaultValue": "0x33295b5De6e00",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization:",
            "description": "<p>&quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/transaction.js",
    "groupTitle": "transaction"
  },
  {
    "type": "get",
    "url": "/api/transaction/find-to",
    "title": "find-to",
    "description": "<p>Filtering record transaction from field 'to'</p>",
    "group": "transaction",
    "name": "find-to",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "limit",
        "description": "<p>DefaultValue = 15</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "current_page",
        "description": "<p>DefaultValue = 1</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "pairAddress",
        "description": "<p>&quot;&quot;</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "walletAddress",
        "description": "<p>&quot;&quot;</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization:",
            "description": "<p>&quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/transaction.js",
    "groupTitle": "transaction"
  },
  {
    "type": "get",
    "url": "/api/vendor/alloc-point",
    "title": "alloc-point",
    "description": "<p>How much can you sell SDB</p>",
    "group": "vendor",
    "name": "alloc-point",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/vendor.js",
    "groupTitle": "vendor"
  },
  {
    "type": "post",
    "url": "/api/vendor/calc-vendor",
    "title": "calc-vendor",
    "group": "vendor",
    "name": "calc-vendor",
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "amount",
        "description": ""
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/vendor.js",
    "groupTitle": "vendor"
  },
  {
    "type": "get",
    "url": "/api/vendor/money-point",
    "title": "money-point",
    "description": "<p>How much USD have accumulated</p>",
    "group": "vendor",
    "name": "money-point",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/vendor.js",
    "groupTitle": "vendor"
  },
  {
    "type": "get",
    "url": "/api/vendor/pool-info",
    "title": "pool-info",
    "group": "vendor",
    "name": "pool-info",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/vendor.js",
    "groupTitle": "vendor"
  },
  {
    "type": "get",
    "url": "/api/admin/wallet/fetch",
    "title": "fetch",
    "description": "<p>fetch list wallet for a wallet by parameter :address</p>",
    "group": "wallet",
    "name": "fetch",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "defaultValue": "15",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current_page",
            "defaultValue": "1",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Optional</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/wallet.js",
    "groupTitle": "wallet"
  },
  {
    "type": "get",
    "url": "/api/admin/wallet/find",
    "title": "find:wallet",
    "description": "<p>Search for a wallet by parameter :address</p>",
    "group": "wallet",
    "name": "find",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/wallet.js",
    "groupTitle": "wallet"
  }
] });
