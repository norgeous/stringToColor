# angular-stringtocolour
Convert an arbitrary string to a colour, via use of CRC32

# WIP
work in progress, just figuring out git

# FEATURES (nothing implimented yet)
1.
2.
3.
4.
5.
6.
7.
8.
9.


# EXAMPLES
be able to create elements with special attribute,
such as:

```
<div strtocolour="background:some text">
	some text
</div>

<div strtocolour="color:some text">
	some text
</div>
```

# Demo
<a href="https://cdn.rawgit.com/norgeous/angular-stringtocolour/master/demo.html">here</a>

##How it Works

1. takes the input string `foo`
2. makes a CRC of the string `b5a3f534`
3. use `#b5a3f5` as a CSS colour (trim last 2)