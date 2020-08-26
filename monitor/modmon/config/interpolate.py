import configparser
import os


class EnvInterpolation(configparser.BasicInterpolation):
    """Interpolation which expands environment variables in values. Taken from
    this gist: https://gist.github.com/malexer/ee2f93b1973120925e8beb3f36b184b8"""

    def before_get(self, parser, section, option, value, defaults):
        value = super().before_get(parser, section, option, value, defaults)
        return os.path.expandvars(value)
