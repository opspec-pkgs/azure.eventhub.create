# problem statement
creates an azure event hub (if it doesn't already exist)

# example usage

> note: in examples, VERSION represents a version of the azure.eventhub.create pkg

## install

```shell
opctl pkg install github.com/opspec-pkgs/azure.eventhub.create#VERSION
```

## run

```
opctl run github.com/opspec-pkgs/azure.eventhub.create#VERSION
```

## compose

```yaml
run:
  op:
    pkg: { ref: github.com/opspec-pkgs/azure.eventhub.create#VERSION }
    inputs: 
      subscriptionId:
      spId:
      spTenantId:
      spClientSecret:
      resourceGroup:
      namespace:
      name:
      # begin optional args
      messageRetentionInDays:
      partitionCount:
      # end optional args
```