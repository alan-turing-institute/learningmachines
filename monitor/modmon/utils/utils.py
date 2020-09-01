def ask_for_confirmation(message):
    """Ask user to confirm an action.

    Parameters
    ----------
    message : str
        Message/question the user will be prompted to confirm.

    Returns
    -------
    bool
        True if user input is "yes", False otherwise.
    """
    answer = input(f"{message} Type 'yes' to continue: ")
    if answer != "yes":
        return False
    else:
        return True


def build_model_identifier(model_id, model_version):
    """Generate the long identifier for a model given its ID and version. Used for
    naming conda environments, storage directories, and similar.

    Parameters
    ----------
    model_id : int
        ID of the model
    model_version : str
        Version of the model

    Returns
    -------
    str
        Environment name with the format ModMon-model-<model_id>-version-<model_version>
    """
    return f"ModMon-model-{model_id}-version-{model_version}"
