# MongoDB Indexes

---

## Syntax: `db.collection.explain()`

It is used to get the details and explanation of query plans

---

## Example (without indexing)

command to get the details and execution query plan of query `db.users.find({ username: 'm.asadullah' }).explain('executionStats')`.

### Output (without indexing)

```json
{
  "explainVersion": "1",
  "queryPlanner": {
    "namespace": "users.users",
    "parsedQuery": { "username": { "$eq": "m.asadullah" } },
    "indexFilterSet": false,
    "queryHash": "1DCAA255",
    "planCacheKey": "E4474531",
    "optimizationTimeMillis": 0,
    "maxIndexedOrSolutionsReached": false,
    "maxIndexedAndSolutionsReached": false,
    "maxScansToExplodeReached": false,
    "prunedSimilarIndexes": false,
    "winningPlan": {
      "isCached": false,
      "stage": "COLLSCAN",
      "filter": { "username": { "$eq": "m.asadullah" } },
      "direction": "forward"
    },
    "rejectedPlans": []
  },
  "executionStats": {
    "executionSuccess": true,
    "nReturned": 1,
    "executionTimeMillis": 0,
    "totalKeysExamined": 0,
    "totalDocsExamined": 11,
    "executionStages": {
      "isCached": false,
      "stage": "COLLSCAN",
      "filter": { "username": { "$eq": "m.asadullah" } },
      "nReturned": 1,
      "executionTimeMillisEstimate": 0,
      "works": 12,
      "advanced": 1,
      "needTime": 10,
      "needYield": 0,
      "saveState": 0,
      "restoreState": 0,
      "isEOF": 1,
      "direction": "forward",
      "docsExamined": 11
    }
  },
  "command": {
    "find": "users",
    "filter": { "username": "m.asadullah" },
    "$db": "users"
  },
  "serverInfo": {
    "host": "masadullah",
    "port": 27017,
    "version": "8.0.3",
    "gitVersion": "89d97f2744a2b9851ddfb51bdf22f687562d9b06"
  },
  "serverParameters": {
    "internalQueryFacetBufferSizeBytes": 104857600,
    "internalQueryFacetMaxOutputDocSizeBytes": 104857600,
    "internalLookupStageIntermediateDocumentMaxSizeBytes": 104857600,
    "internalDocumentSourceGroupMaxMemoryBytes": 104857600,
    "internalQueryMaxBlockingSortMemoryUsageBytes": 104857600,
    "internalQueryProhibitBlockingMergeOnMongoS": 0,
    "internalQueryMaxAddToSetBytes": 104857600,
    "internalDocumentSourceSetWindowFieldsMaxMemoryBytes": 104857600,
    "internalQueryFrameworkControl": "trySbeRestricted",
    "internalQueryPlannerIgnoreIndexWithCollationForRegex": 1
  },
  "ok": 1
}
```

---

## Example (with indexing)

command to create index on specified field `db.users.createIndex({ username: -1 })`.
command to get the created or applied index fields `db.users.getIndexes()`.
command to get the details and execution query plan of query `db.users.find({ username: 'm.asadullah' }).explain('executionStats')`.

### Output (with indexing)

```json
{
  "explainVersion": "1",
  "queryPlanner": {
    "namespace": "users.users",
    "parsedQuery": { "username": { "$eq": "m.asadullah" } },
    "indexFilterSet": false,
    "queryHash": "1DCAA255",
    "planCacheKey": "AEA547E9",
    "optimizationTimeMillis": 0,
    "maxIndexedOrSolutionsReached": false,
    "maxIndexedAndSolutionsReached": false,
    "maxScansToExplodeReached": false,
    "prunedSimilarIndexes": false,
    "winningPlan": {
      "isCached": false,
      "stage": "FETCH",
      "inputStage": {
        "stage": "IXSCAN",
        "keyPattern": { "username": -1 },
        "indexName": "username_-1",
        "isMultiKey": false,
        "multiKeyPaths": { "username": [] },
        "isUnique": false,
        "isSparse": false,
        "isPartial": false,
        "indexVersion": 2,
        "direction": "forward",
        "indexBounds": { "username": ["[\"m.asadullah\", \"m.asadullah\"]"] }
      }
    },
    "rejectedPlans": []
  },
  "executionStats": {
    "executionSuccess": true,
    "nReturned": 1,
    "executionTimeMillis": 0,
    "totalKeysExamined": 1,
    "totalDocsExamined": 1,
    "executionStages": {
      "isCached": false,
      "stage": "FETCH",
      "nReturned": 1,
      "executionTimeMillisEstimate": 0,
      "works": 2,
      "advanced": 1,
      "needTime": 0,
      "needYield": 0,
      "saveState": 0,
      "restoreState": 0,
      "isEOF": 1,
      "docsExamined": 1,
      "alreadyHasObj": 0,
      "inputStage": {
        "stage": "IXSCAN",
        "nReturned": 1,
        "executionTimeMillisEstimate": 0,
        "works": 2,
        "advanced": 1,
        "needTime": 0,
        "needYield": 0,
        "saveState": 0,
        "restoreState": 0,
        "isEOF": 1,
        "keyPattern": { "username": -1 },
        "indexName": "username_-1",
        "isMultiKey": false,
        "multiKeyPaths": { "username": [] },
        "isUnique": false,
        "isSparse": false,
        "isPartial": false,
        "indexVersion": 2,
        "direction": "forward",
        "indexBounds": { "username": ["[\"m.asadullah\", \"m.asadullah\"]"] },
        "keysExamined": 1,
        "seeks": 1,
        "dupsTested": 0,
        "dupsDropped": 0
      }
    }
  },
  "command": {
    "find": "users",
    "filter": { "username": "m.asadullah" },
    "$db": "users"
  },
  "serverInfo": {
    "host": "masadullah",
    "port": 27017,
    "version": "8.0.3",
    "gitVersion": "89d97f2744a2b9851ddfb51bdf22f687562d9b06"
  },
  "serverParameters": {
    "internalQueryFacetBufferSizeBytes": 104857600,
    "internalQueryFacetMaxOutputDocSizeBytes": 104857600,
    "internalLookupStageIntermediateDocumentMaxSizeBytes": 104857600,
    "internalDocumentSourceGroupMaxMemoryBytes": 104857600,
    "internalQueryMaxBlockingSortMemoryUsageBytes": 104857600,
    "internalQueryProhibitBlockingMergeOnMongoS": 0,
    "internalQueryMaxAddToSetBytes": 104857600,
    "internalDocumentSourceSetWindowFieldsMaxMemoryBytes": 104857600,
    "internalQueryFrameworkControl": "trySbeRestricted",
    "internalQueryPlannerIgnoreIndexWithCollationForRegex": 1
  },
  "ok": 1
}
```
