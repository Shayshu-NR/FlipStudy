# FlipStudy

Just a simple completely browser facing flashcard builder for all your studying desires.

To run it in a dev environment, run these commands:
1. `npm install`
2. `npm run dev`
3. `npx tailwindcss -i ./src/input.css -o ./src/output.css --watch`

There are 4 mains routes: 
## Study
Runs the currently loaded study set, where you can flip the current flashcard, and then pick whether you got it right or wrong.

## New
Create a new study set and export it to a JSON file.
The export is in the following schema: 
```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "setID": {
      "type": "string"
    },
    "setName": {
      "type": "string"
    },
    "setDescription": {
      "type": "string"
    },
    "cards": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "questionID": {
              "type": "integer"
            },
            "flip": {
              "type": "boolean"
            },
            "front": {
              "type": "object",
              "properties": {
                "title": {
                  "type": "string"
                },
                "body": {
                  "type": "string"
                },
                "tags": {
                  "type": "array",
                  "items": 
                    {
                        "type": "object",
                        "properties": {
                        "name": {
                            "type": "string"
                        },
                        "code": {
                            "type": "string"
                        }
                        },
                        "required": [
                        "name",
                        "code"
                        ]
                    }
                }
              },
              "required": [
                "title",
                "body",
                "tags"
              ]
            },
            "back": {
              "type": "object",
              "properties": {
                "title": {
                  "type": "string"
                },
                "body": {
                  "type": "string"
                },
                "tags": {
                  "type": "array",
                  "items": [
                    {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "code": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "name",
                        "code"
                      ]
                    }
                  ]
                }
              },
              "required": [
                "title",
                "body",
                "tags"
              ]
            }
          },
          "required": [
            "questionID",
            "flip",
            "front",
            "back"
          ]
        }
      ]
    }
  },
  "required": [
    "setID",
    "setName",
    "setDescription",
    "cards"
  ]
}
```

## Edit
Allows you to edit the currently loaded study set and then re-export it.

## Load
Allows you to pick a JSON file to load as the study set.