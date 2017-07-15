# Problem statement
creates an azure event hub (if it doesn't already exist)

# Example usage

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
      loginId:
      loginSecret:
      loginTenantId:
      resourceGroup:
      namespace:
      name:
      # begin optional args
      loginType:
      messageRetentionInDays:
      partitionCount:
      # end optional args
```

# Support

join us on [![Slack](https://opspec-slackin.herokuapp.com/badge.svg)](https://opspec-slackin.herokuapp.com/)
or [open an issue](https://github.com/opspec-pkgs/azure.eventhub.create/issues)
