PYTHON_MAJOR_VERSION=`python -c 'import sys; print(sys.version_info[:1][0])'`

if [ "$PYTHON_MAJOR_VERSION" = "2" ]; then
  python -m SimpleHTTPServer 8000
else
  python -m http.server 8000
fi
