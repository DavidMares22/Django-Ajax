from django import forms
from django.core.exceptions import ValidationError
from .models import Room,Post
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model


class PostForm(forms.ModelForm):
    content = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control','id':'post-content','placeholder': 'Post text...'}))
    class Meta:
        model = Post
        fields = ['content']
 

      



class  RoomForm(forms.ModelForm):

    class  Meta:
        model = Room
        fields =  '__all__'

    def __init__(self, *args, **kwargs):
        super(RoomForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control' 


    def clean_name(self):
        data = self.cleaned_data['name']
        if  len(data)<3:
            raise ValidationError("At least 3 characters!")
 
        return data

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        fields = ('username', 'password1', 'password2')
        model = get_user_model()
    
    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Username',
                                                                'class': 'form-control',
                                                                }))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password',
                                                                    'class': 'form-control mb-4',
                                                                    }))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password',
                                                                'class': 'form-control mb-4',
                                                                }))     