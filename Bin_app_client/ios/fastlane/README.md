fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Push a new beta build to TestFlight

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).


## Fastlane notes:


### TO cleanup pods
pod cache clean --all

### if pods return ' can't find gem cocoapods (>= 0.a) with executable pod'
sudo gem uninstall cocoapods
sudo gem install -n /usr/local/bin cocoapods


# and this worked insted of usual pod install (in main folder):
bundle install


brew install openssl@1.1
brew uninstall --ignore-dependencies openssl@3
rvm install 3.2.2
brew install --ignore-dependencies openssl@3